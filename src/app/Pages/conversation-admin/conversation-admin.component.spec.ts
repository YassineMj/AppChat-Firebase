import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationAdminComponent } from './conversation-admin.component';

describe('ConversationAdminComponent', () => {
  let component: ConversationAdminComponent;
  let fixture: ComponentFixture<ConversationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
