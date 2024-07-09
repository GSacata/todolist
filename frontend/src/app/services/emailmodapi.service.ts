import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailModObj } from '../models/emailobj';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailmodapiService {
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllEmailModObj(): Observable<any> {
    return this.http.get(this.baseurl + "/email_mod/", {headers: this.httpHeaders})
  }

  getOneEmailModObj(emailobj: EmailModObj): Observable <any> {
    return this.http.get(this.baseurl + `/email_mod/${emailobj.id}`, {headers: this.httpHeaders})
  }

  editEmail(emailobj: EmailModObj): Observable <any> {
    const body = {email_address: emailobj.email_address, email_password: emailobj.email_password, email_subject: emailobj.email_subject}
    return this.http.put(this.baseurl + `/email_mod/${emailobj.id}/`, body, {headers: this.httpHeaders})
  }

  testEmail(emailobj: EmailModObj): Observable <any> {
    const body = {email_address: emailobj.email_address, email_password: emailobj.email_password, email_subject: emailobj.email_subject}
    return this.http.post(this.baseurl + `/email_mod/test_email/`, body, {headers: this.httpHeaders})
  }

  sendReminderEmail(emailobj: EmailModObj): Observable <any> {
    const body = {email_address: emailobj.email_address, email_password: emailobj.email_password, email_subject: emailobj.email_subject}
    return this.http.post(this.baseurl + `/email_mod/send_reminder/`, body, {headers: this.httpHeaders})
  }
  
}
