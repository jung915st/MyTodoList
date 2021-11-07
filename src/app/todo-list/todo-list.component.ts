import { Component, OnInit } from '@angular/core';

import { TodoListService } from './todo-list.service';

import { Todo } from './todo.model';

import { TodoStatusType } from './todo-status-type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

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

  addTodo(event: KeyboardEvent): void {

    const todostuff = event.target as HTMLInputElement;

    if (!todostuff) {
      return;
    }

    const todo = todostuff.value.trim();
    if (event.key === 'Enter') {
      this.todoListService.add(todo);
      todostuff.value = '';
    }

  }

  getList(): Todo[] {
    return this.todoListService.getList();
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


}

