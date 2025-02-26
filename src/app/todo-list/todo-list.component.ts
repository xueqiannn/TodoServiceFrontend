import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { Router } from '@angular/router';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  items: ToDoItem[] = [];
  constructor(
    private router: Router,
    private todoHttp: TodohttpService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.todoHttp.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  onDone(item: ToDoItem) {
    this.todoHttp.markDone(item).subscribe();
  }

  onGoToDetail(id: number) {
    this.router.navigateByUrl(`detail/${id}`);
  }

  onDelete(id: number) {
    this.todoHttp.delete(id).subscribe(() => {
      this.refresh();
    });
  }
}
