import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { MOCKEMAILOBJ } from '../misc/mock_emailobj';
import { EmailmodapiService } from '../services/emailmodapi.service';
import { EmailModObj } from '../models/emailobj';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-mod',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './email-mod.component.html',
  styleUrl: './email-mod.component.css'
})

export class EmailModComponent {
  emailobj = MOCKEMAILOBJ;
  selectedEmail: any;

  // @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter<EmailModObj>();

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }

  addNewItem(value: EmailModObj) {
    this.newItemEvent.emit({id: value.id, email_address: value.email_address, email_password: value.email_password, email_subject: value.email_subject});
  }

  getAllEmailModObj() {
    this.emailmodapi.getAllEmailModObj().subscribe({
      next: (data) => {
        this.emailobj = data
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Success: GET all email objects") }
    })
  }

  getOneEmailModObj(emailobj: EmailModObj) {
    this.emailmodapi.getOneEmailModObj(emailobj).subscribe({
      next: (data) => {
        this.selectedEmail = data
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Success: GET one email object") }
    })
  }

  editAndTestEmail(emailobj: EmailModObj) {
    this.emailmodapi.editAndTestEmail(emailobj).subscribe({
      next: (data) => {
        emailobj = data
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: POST edited email`) }
    })
  }

  // GUARDANDO PARA SEND REMINDER
  // editAndTestEmail(emailobj: EmailModObj) {
  //   this.emailmodapi.editAndTestEmail(emailobj).subscribe({
  //     next: (data) => {
  //       data = this.emailobj
  //     },
  //     error: (error) => { console.log(error) },
  //     complete: () => { console.log("Success: GET all email objects") }
  //   })
  // }

  sendReminderEmail(emailobj: EmailModObj) {
    this.emailmodapi.sendReminderEmail(emailobj).subscribe({
      next: (data) => {
        data = this.selectedEmail
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: POST sent reminder email`) }
    })
  }

  constructor (private emailmodapi: EmailmodapiService) {
    this.getAllEmailModObj();
    this.getOneEmailModObj(this.emailobj[0])
  }
}
