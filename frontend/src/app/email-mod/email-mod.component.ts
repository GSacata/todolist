import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { MOCKEMAILOBJ } from '../misc/mock_emailobj';
import { EmailmodapiService } from '../services/emailmodapi.service';

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

  getAllEmailModObj() {
    this.emailmodapi.getAllEmailModObj().subscribe({
      next: (data) => {
        this.emailobj = data
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Success: GET all email objects") }
    })
  }

  constructor (private emailmodapi: EmailmodapiService) {
    this.getAllEmailModObj();
  }
}
