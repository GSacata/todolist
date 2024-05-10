import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoapiService } from './services/todoapi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, TodolistComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TodoapiService]
})

export class AppComponent {
  title = 'frontend';
}
