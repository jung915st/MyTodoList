import { Injectable } from '@angular/core';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() { }

  /**
   * get list of todo
   * @returns {Todo[]}
   * @memberof TodoListService
   */
  getList(): Todo[] {
    return this.list;
  }

    /**
   * add new item
   *
   * @param {string} title - item's title
   * @memberof TodoListService
   */
  add(title: string): void {

    if (title || title.trim()) {
      this.list.push(new Todo(title));
    }
  }

  remove(index: number): void {
    this.list.splice(index, 1);
  }

  /**
 * get item list
 *
 * @param {boolean} completed - get list of comleted item
 * @returns {Todo[]}
 * @memberof TodoListService
 */
 getWithCompleted(completed: boolean): Todo[] {
   return this.list.filter(todo => todo.done === completed);
 }

 removeCompleted(): void {
  this.list = this.getWithCompleted(false);
}



}
