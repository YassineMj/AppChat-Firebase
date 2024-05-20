import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationConsultantComponent } from './conversation-consultant.component';

describe('ConversationConsultantComponent', () => {
  let component: ConversationConsultantComponent;
  let fixture: ComponentFixture<ConversationConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
