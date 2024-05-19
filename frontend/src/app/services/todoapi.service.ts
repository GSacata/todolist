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
    return this.http.get(this.baseurl + '/todolist/', {headers: this.httpHeaders});
  }

  getOneTask(id: number): Observable <any> {
    return this.http.get(this.baseurl + `/todolist/${id}`, {headers: this.httpHeaders});
  }

  editTask(task: TodoTask): Observable <any> {
    const body = {task_title: task.task_title, task_completion: task.task_completion, task_description: task.task_description}
    return this.http.put(this.baseurl + `/todolist/${task.id}/`, body, {headers: this.httpHeaders})
  }

  createTask(task: TodoTask): Observable <any> {
    const body = {task_title: task.task_title, task_completion: task.task_completion, task_description: task.task_description}
    return this.http.post(this.baseurl + `/todolist/`, body, {headers: this.httpHeaders})
  }

  deleteTask(id: number): Observable <any> {
    return this.http.delete(this.baseurl + `/todolist/${id}/`, {headers: this.httpHeaders})
  }
}

// export interface TodoTask {
//   id: number
//   task_title: string
//   task_completion: boolean
//   task_description: string
//   task_created_at: string
//   task_updated_at: string
// }