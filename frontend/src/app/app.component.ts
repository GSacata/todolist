import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { EmailModComponent } from './email-mod/email-mod.component';
import { TodoapiService } from './services/todoapi.service';
import { EmailmodapiService } from './services/emailmodapi.service';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, TodolistComponent, EmailModComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    TodoapiService, EmailmodapiService
  ]
})

export class AppComponent {
  title = 'frontend';
}