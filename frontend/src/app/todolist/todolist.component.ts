import { Component } from '@angular/core';
import { MOCKTASKLIST } from '../misc/mock_todotasks';
import { TodoTask } from '../models/todotask';
import { TodoapiService } from '../services/todoapi.service';
import { AppModule } from '../app.module';
declare var $: any;

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

  showTaskDetails(id: number) {
    $(`#task-${id} > div.task-details`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > span`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > input`).toggle();
  }

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

  editTaskBody(task: TodoTask) {
    this.showTaskDetails(task.id);
    // this.todoapi.editTaskBody(this.selectedTask).subscribe({
    //   next: (data) => {
    //     this.task = this.selectedTask
    //   },
    //   error: (err) => { console.log(err) },
    //   complete: () => { console.log(`Success: PUT edited task ${task.id}`) }
    // }),
    // this.refreshTasks();
  }

  createTask(task: TodoTask) {
    this.todoapi.createTask(this.selectedTask).subscribe({
      next: (data) => {
        // this.task.push(data)
        data = this.selectedTask
        this.refreshTasks();
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: POST created task ${task.id}`) }
    })
  }

  deleteTask(task: TodoTask) {
    this.todoapi.deleteTask(task.id).subscribe({
      next: () => {
        this.refreshTasks();
      }
    })
  }

  refreshTasks() {
    this.getAllTasks();
    this.selectedTask = {id: "", task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
  }

  constructor (private todoapi: TodoapiService) {
    this.getAllTasks()
    this.selectedTask = {task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
  }
}