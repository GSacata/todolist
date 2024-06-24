import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailModComponent } from './email-mod.component';

describe('EmailModComponent', () => {
  let component: EmailModComponent;
  let fixture: ComponentFixture<EmailModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
