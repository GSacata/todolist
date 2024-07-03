import { Component, OnInit } from '@angular/core';
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

export class EmailModComponent implements OnInit {
  emailobj = MOCKEMAILOBJ;
  selectedEmail: any;

  // @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter<EmailModObj>();

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }

  ngOnInit(): void {
    this.selectedEmail = this.getOneEmailModObj(this.emailobj[0]);
  }

  addNewItem(value: EmailModObj) {
    this.newItemEvent.emit(this.selectedEmail);
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
        emailobj.id = data.id
        emailobj.email_address = data.email_address
        emailobj.email_password = data.email_password
        emailobj.email_subject = "Test email"
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
    this.emailmodapi.editAndTestEmail(emailobj).subscribe({
      next: (data) => {
        emailobj.id = data.id
        emailobj.email_address = data.email_address
        emailobj.email_password = data.email_password
        emailobj.email_subject = data.email_subject
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: POST reminder email`) }
    })
  }

  constructor (private emailmodapi: EmailmodapiService) {
    this.getAllEmailModObj();
    this.getOneEmailModObj(this.emailobj[0])
  }
}
