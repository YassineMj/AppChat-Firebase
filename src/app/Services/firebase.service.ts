import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, first, flatMap, forkJoin, lastValueFrom, map, mergeMap, switchMap, tap, throwError } from 'rxjs';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  async registerAdmin(email: string, password: string, nom: string, role: string): Promise<{ message: string }> {
    try {
        const adminId = this.generateCode();
        const adminRef = this.db.object(`users/${adminId}`);

        await adminRef.set({ email, password, nom, role });

        // Créer les conversations pour le nouvel admin
        await this.createConversationsForAdmin(adminId,nom);

        return { message: "Admin successfully registered" };
    } catch (error) {
        console.error("Error registering admin:", error);
        throw error; // Re-throw pour caller handling
    }
  }
  createConversationsForAdmin(adminId: string , nomAd:any): Promise<void[]> {
      return lastValueFrom(
          this.db.list('users', ref => ref.orderByChild('role').equalTo('consultant'))
              .snapshotChanges()
              .pipe(
                  first(),
                  mergeMap(consultantsSnapshot => {
                      if (!consultantsSnapshot || consultantsSnapshot.length === 0) {
                          return Promise.reject(new Error("Aucun consultant trouvé."));
                      }

                      const conversations = consultantsSnapshot.map(consultantSnapshot => {
                          const consultantId = consultantSnapshot.payload.key;
                          const conversationId = this.generateCode();
                          const consultantData: any = consultantSnapshot.payload.val();
                          const nom=consultantData.nom;
                          return { adminId, consultantId, conversationId , nomC:nom};
                      });

                      return Promise.all(conversations.map(conversation =>
                          this.db.object(`conversations/${conversation.conversationId}`).set({
                              adminId: conversation.adminId,
                              consultantId: conversation.consultantId,
                              nomConsultant:conversation.nomC,
                              nomAdmin:nomAd
                          })
                      ));
                  }),
                  catchError(error => {
                      console.error("Error creating conversations:", error);
                      return Promise.reject(error); // Re-throw for caller handling
                  })
              )
      );
  }
  loginAdmin(email: string, password: string): Observable<string> {
    return this.db.list<any>('users', ref => ref.orderByChild('email').equalTo(email).limitToFirst(1)).snapshotChanges()
      .pipe(
        map((usersSnapshot) => {
          const user = usersSnapshot[0].payload.val() as any;
          const userId = usersSnapshot[0].payload.key;
          if (user && user.password === password && user.role === 'admin' && userId) {
            return userId; // Retourne uniquement l'ID de l'utilisateur
          } else {
            throw new Error("Email ou mot de passe incorrect.");
          }
        }),
        catchError(error => throwError(error))
      );
  }
  getAdminConversations(adminId: string): Observable<any[]> {
    return this.db.list('conversations', ref => ref.orderByChild('adminId').equalTo(adminId)).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const idConversation = c.key;
            const data :any= c.payload.val();
            const nomConsultant=data.nomConsultant;
            const nomAdmin=data.nomAdmin;
            const idSender=data.adminId;
            return { idConversation, nomConsultant ,idSender,nomAdmin}; // Retourner l'ID et les données de la conversation
          });
        })
      );
  }


  async registerConsultant(email: string, password: string, nom: string, role: string): Promise<any> {
    try {
        const consultantId = this.generateCode();
        const consultantRef = this.db.object(`users/${consultantId}`);
        
        await consultantRef.set({ email, password, nom, role });

        // Créer les conversations pour le nouvel consultant
        await this.createConversationsForConsultant(consultantId,nom);

        return { message: "Consultant successfully registered" };
    } catch (error) {
        console.error("Error registering consultant:", error);
        throw error; // Re-throw for caller handling
    }
  }
  async createConversationsForConsultant(consultantId: string , nomC:any): Promise<void> {
    try {
        const adminsSnapshot = await lastValueFrom(
            this.db.list('users', ref => ref.orderByChild('role').equalTo('admin')).snapshotChanges().pipe(first())
        );

        if (adminsSnapshot && adminsSnapshot.length > 0) {
            console.log("Creating conversations for the consultant");

            const promises = adminsSnapshot.map(adminSnapshot => {
                const adminKey = adminSnapshot.payload.key;
                const adminData: any = adminSnapshot.payload.val();
                const nom = adminData.nom;
                const conversationId = this.generateCode();
                const conversationData = { adminId: adminKey, consultantId , nomAdmin:nom , nomConsultant:nomC};

                return this.db.object(`conversations/${conversationId}`).set(conversationData);
            });

            await Promise.all(promises);
        } else {
            throw new Error("Aucun administrateur trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de la création des conversations:", error);
        throw error;
    }
  }
  loginConsultant(email: string, password: string): Observable<any> {
    return this.db.list<any>('users', ref => ref.orderByChild('email').equalTo(email).limitToFirst(1)).snapshotChanges()
      .pipe(
        map((usersSnapshot) => {
          const user = usersSnapshot[0].payload.val() as any;
          const userId = usersSnapshot[0].payload.key;
          if (user && user.password === password && user.role === 'consultant' && userId) {
            return userId; // Retourne uniquement l'ID de l'utilisateur
          } else {
            throw new Error("Email ou mot de passe incorrect.");
          }
        }),
        catchError(error => throwError(error))
      );
  }
  getConversationsForConsultant(consultantId: string): Observable<any[]> {
    return this.db.list('conversations', ref => ref.orderByChild('consultantId').equalTo(consultantId)).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const idConversation = c.key;
            const data :any= c.payload.val();
            const nomAdmin=data.nomAdmin;
            const nomConsultant=data.nomConsultant;

            const idSender=data.consultantId;
            return { idConversation, nomAdmin ,idSender , nomConsultant}; // Retourner l'ID et les données de la conversation
          });
        })
      );
  }
     

  generateCode(): string {
    return this.db.createPushId();
  }

  sendMessage(conversationId: string, senderId: string, text: string , nomSender:any): Promise<any> {
    return new Promise((resolve, reject) => {
      const messageRef = this.db.list(`conversations/${conversationId}/messages`);
      const timestamp = { '.sv': 'timestamp' }; // Utilisation du ServerValue.TIMESTAMP directement depuis Firebase
      messageRef.push({ senderId, text, timestamp , nomSender})
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  

  getMessages(conversationId: string): Observable<any[]> {
    return this.db.list(`conversations/${conversationId}/messages`).valueChanges();
  }

}
