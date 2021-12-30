import { Component, OnInit } from '@angular/core';

import { TodoListService } from './todo-list.service';

import { Todo } from './todo.model';

import { TodoStatusType } from './todo-status-type.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {


  /**
  * item status
  *
  * @memberof TodoListComponent
  */
 todoStatusType = TodoStatusType;
  /**
  * 目前狀態
  *
  * @private
  * @memberof TodoListComponent
  */
 private status = TodoStatusType.All;

 constructor(private todoListService: TodoListService) { }

 ngOnInit() {
 }

  addTodo(event:KeyboardEvent): void {

    const todos = event.target as HTMLInputElement;

    if (!todos) {
      return;
    }
    if (event.key === 'Enter') {
      const todo = todos.value.trim();
      this.todoListService.add(todo);
      todos.value = '';
    }
  }

  getList(): Todo[] {
    let list: Todo[] = [];
    switch (this.status) {

      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;

      default:
        list = this.todoListService.getList();
        break;

    }
    return list;
  }

  remove(index: number): void {
    this.todoListService.remove(index);
  }

  /**
   * modify edit mode
  * @param {Todo} todo
  * @memberof TodoListComponent
  */
 edit(todo: Todo): void {
   todo.editable = true;
 }

 /**
  * update edit item
  * @param {Todo} todo - original item
  * @param {string} newTitle - new item title
  * @memberof TodoListComponent
 */
 update(todo: Todo, newTitle: string): void {

  if (!todo.editing) {
    return;
  }

  const title = newTitle.trim();

  // if item title modified, then update with new title
  if (title) {
    todo.setTitle(title);
    todo.editable = false;

  // if item title is empty or deleted, then remove that item
  } else {
    const index = this.getList().indexOf(todo);
    if (index !== -1) {
      this.remove(index);
    }
  }

}

 /**
  * cancel edit mode
  * @param {Todo} todo - item to be canceled
  * @memberof TodoListComponent
  */
 cancelEditing(todo: Todo): void {
   todo.editable = false;
 }

 /**
 * get list of incompleted item
 *
 * @returns {Todo[]}
 * @memberof TodoListComponent
 */
 getRemainingList(): Todo[] {
   return this.todoListService.getWithCompleted(false);
}

getCompletedList(): Todo[] {
  return this.todoListService.getWithCompleted(true);
}

setStatus(status: number): void {
  this.status = status;
}

checkStatus(status: number): boolean {
  return this.status === status;
}

removeCompleted(): void {
  this.todoListService.removeCompleted();
}

getAllList(): Todo[] {
  return this.todoListService.getList();
}

allCompleted(): boolean {
  return this.getAllList().length === this.getCompletedList().length;
}

setAllTo(completed: boolean): void {

  this.getAllList().forEach((todo) => {
    todo.setCompleted(completed);
  });

}

}

