import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoTask } from '../models/todotask';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TodoapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {  }

  getAllTasks(): Observable <any> {
    return this.http.get(this.baseurl + '/todolist/', {headers: this.httpHeaders})
  }
}
