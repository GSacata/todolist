import { Component } from '@angular/core';
import { MOCKTASKLIST } from '../misc/mock_todotasks';
import { TodoTask } from '../models/todotask';
import { TodoapiService } from '../services/todoapi.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})

export class TodolistComponent {
  task = MOCKTASKLIST;
  selectedTask: any;

  getAllTasks() {
    this.todoapi.getAllTasks().subscribe({
      next: (data) => {
        this.task = data
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log("Success: GET all tasks") }
    })
  }

  getOneTask(task: TodoTask) {
    this.todoapi.getOneTask(task.id).subscribe({
      next: (data) => {
        this.selectedTask = data
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: GET task ${task.id}`) }
    })
  }

  constructor (private todoapi: TodoapiService) {
    this.getAllTasks()
  }
}
