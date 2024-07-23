import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { MOCKEMAILOBJ } from '../misc/mock_emailobj';
import { EmailmodapiService } from '../services/emailmodapi.service';
import { EmailModObj } from '../models/emailobj';
import { Output, EventEmitter } from '@angular/core';
declare var $: any;

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
  tempPassword: string = "";

  // @Output() newItemEvent = new EventEmitter<EmailModObj>();
  @Output() newItemEvent = new EventEmitter<EmailModObj>();

  // addNewItem(value: EmailModObj) {
  //   this.newItemEvent.emit(this.selectedEmail);
  // }

  addNewItem(value: EmailModObj) {
    this.editEmail(value);

    // Tests password format
    this.emailmodapi.getOneEmailModObj(value).subscribe({
      next: (data) => {
        this.selectedEmail = data
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Success: GET one email object") }
    })
    this.tempPassword = this.selectedEmail.email_password
    console.log(this.tempPassword)
    
    const regex = new RegExp(/[a-z]{4}\s[a-z]{4}\s[a-z]{4}\s[a-z]{4}/);
    if (regex.test(this.tempPassword)) {
      this.hidePasswordWarning();
      this.newItemEvent.emit(value);
    } else {
      this.showPasswordWarning();
    }
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
  
  editEmail(emailobj: EmailModObj) {
    this.emailmodapi.editEmail(emailobj).subscribe({
      next: (data) => {
        emailobj = data;
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: POST edited email`) }
    })
  }
  
  testEmail(emailobj: EmailModObj) {
    this.emailmodapi.testEmail(emailobj).subscribe({
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
  
  sendReminderEmail(emailobj: EmailModObj) {
    this.emailmodapi.testEmail(emailobj).subscribe({
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

  showsPassword() {
    const pswdBox = document.querySelector("#password-input");
    // console.log(pswdBox)
    if (pswdBox?.getAttribute('type') == 'password') {
      pswdBox?.setAttribute('type', 'text')
    } else {
      pswdBox?.setAttribute('type', 'password')
    }
  }

  showEmailModHint() {
    $(".emailmod-hint-content").slideToggle(1200);
  }

  showPasswordWarning() {
    $(".emailmod-invalid").show();
  }

  hidePasswordWarning() {
    $(".emailmod-invalid").hide();
  }
  
  ngOnInit(): void {
    console.log("Rodou ngOnInit do email-mod")
    console.log(this.selectedEmail)
  }
  
  constructor (private emailmodapi: EmailmodapiService) {
    this.getAllEmailModObj();
    this.getOneEmailModObj(this.emailobj[0])
    this.selectedEmail = {id: 0, email_address: "", email_password: "", email_subject: ""}
    this.tempPassword = "";
  }
}
