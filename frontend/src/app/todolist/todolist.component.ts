import { Component } from '@angular/core';
import { MOCKTASKLIST } from '../misc/mock_todotasks';
import { MOCKEMAILOBJ } from '../misc/mock_emailobj';
import { TodoTask } from '../models/todotask';
import { TodoapiService } from '../services/todoapi.service';
import { AppModule } from '../app.module';
import { EmailModComponent } from '../email-mod/email-mod.component';
import { EmailModObj } from '../models/emailobj';
import { EmailmodapiService } from '../services/emailmodapi.service';
declare var $: any;

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    AppModule, EmailModComponent
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
  providers: [
    EmailmodapiService
  ]
})

export class TodolistComponent {
  task = MOCKTASKLIST;
  selectedTask: any;
  tdtaskemail: EmailModObj;
  // items = ['item1', 'item2', 'item3', 'item4'];
  // items: any;
  // reminderTask: any;
  // reminderTask: TodoTask;
  // items: EmailModObj = { id: newItem.id, email_address: newItem.email_address, email_password: newItem.email_password, email_subject: newItem.email_subject };

  // todoTaskSendReminderEmail(emailobj: EmailModObj) {
  //   this.emailcomp.sendReminderEmail(emailobj);
  // }

  addItem(newItem: EmailModObj) {
    // // this.items.push(newItem);
    console.log("chamou addItem")
    this.tdtaskemail = { id: newItem.id, email_address: newItem.email_address, email_password: newItem.email_password, email_subject: newItem.email_subject };
    // // this.reminderTask = this.getOneTask(task)
    // // this.todoapi.getOneTask(task.id).subscribe({
    // //   next: (data) => {
    // //     this.reminderTask = data
    // //   },
    // //   error: (err) => { console.log(err) },
    // //   complete: () => { console.log(`Success: Queued task ${task.id} to deletion.`) }
    // // })
    // // this.items = {
    // //   id: newItem.id,
    // //   email_address: newItem.email_address,
    // //   email_password: newItem.email_password,
    // //   email_subject: newItem.email_subject
    // // }
    // // this.todoTaskSendReminderEmail(this.items);
    console.log(this.tdtaskemail);
    // console.log(this.selectedTask);
  }

  getReminderEmail() {
    console.log(this.tdtaskemail)
    this.addItem(this.tdtaskemail)
  }

  showTaskDetails(id: number) {
    $(`#task-${id} > div.task-details`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > span`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > input`).toggle();
    $(`#task-1 > div.titlebar > div.task-sideicon.taskicon-edit`).toggle();
    $(`#task-1 > div.titlebar > div.task-sideicon.taskicon-closeedit`).toggle();
  }

  hideTaskDetails(id: number) {
    $(`#task-${id} > div.task-details`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > span`).toggle();
    $(`#task-${id} > div.titlebar > div:nth-child(2) > div > input`).toggle();
    $(`#task-1 > div.titlebar > div.task-sideicon.taskicon-edit`).toggle();
    $(`#task-1 > div.titlebar > div.task-sideicon.taskicon-closeedit`).toggle();
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
      next: (data) => { task = data },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: GET task ${task.id}`) }
    })
  }

  editTaskBody(task: TodoTask) {
    this.todoapi.editTaskBody(task).subscribe({
      next: (data) => {
        task = data
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: PUT edited task ${task.id}`) }
    }),
    this.hideTaskDetails(task.id);
  }

  cancelEditTaskBody(task: TodoTask) {
    this.hideTaskDetails(task.id);
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

  queueToDeletion(task: TodoTask) {
    $(`#popup-canceltask`).toggle();
    this.todoapi.getOneTask(task.id).subscribe({
      next: (data) => {
        this.selectedTask = data
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: Queued task ${task.id} to deletion.`) }
    })
  }

  deleteTask(task: TodoTask) {
    this.todoapi.deleteTask(task.id).subscribe({
      next: () => {
        this.refreshTasks();
      }
    })
    $(`#popup-canceltask`).toggle();
    // this.selectedTask = {task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""};
  }

  cancelDeleteTask() {
    $(`#popup-canceltask`).toggle();
    this.selectedTask = {task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""};
  }

  refreshTasks() {
    this.getAllTasks();
    this.selectedTask = {id: "", task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
  }

  refreshThisTask(task: TodoTask) {
    this.getOneTask(task);
  }

  markAsDone(task: TodoTask) {
    this.todoapi.editTaskBody(task).subscribe({
      next: () => {
        task.task_completion = true
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: PUT edited task ${task.id}`) }
    })
  }

  markAsNotDone(task: TodoTask) {
    this.todoapi.editTaskBody(task).subscribe({
      next: () => {
        task.task_completion = false
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log(`Success: PUT edited task ${task.id}`) }
    })
  }

  constructor (private todoapi: TodoapiService, private emailapi: EmailmodapiService) {
    this.getAllTasks()
    this.selectedTask = {task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
    this.tdtaskemail = { id: 0, email_address: "", email_password: "", email_subject: "" };
    // this.tdtaskemail = this.emailapi.getOneEmailModObj();
    // this.items = { id: 0, email_address: "", email_password: "", email_subject: "" };
    // this.items = this.emailapi.getOneEmailModObj;
    // this.reminderTask = {id: 0, task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
    // this.tdtaskemail = this.emailapi.getOneEmailModObj(this.emailapi.selectedEmail);
    // this.reminderTask = {id: 0, task_title: "", task_completion: false, task_description: "", task_created_at: "", task_updated_at: ""}
  }
}