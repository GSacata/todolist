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
  
}
