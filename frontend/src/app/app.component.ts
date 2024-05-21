import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoapiService } from './services/todoapi.service';
declare var $: any;

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

  ngOnInit(): void {
    $(document).ready(() => {
      alert("Tem jquery");
    });
  }
}

// export class AppComponent implements OnInit {
//   ngOnInit(): void {
//     $(document).ready(() => {
//       alert("Tem jquery");
//     });
//   }
// }