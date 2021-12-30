export class Todo {
  //name of things to do
  private title = '';

  //status
  private completed = false;

  constructor(title: string) {
    this.title = title || '';
  }

/**
 * completed or not
 * @readonly
 * @type {boolean}
 * @memberof Todo
 */
get done(): boolean {
  return this.completed;
}

/**
 * get things' title
 * @returns {string}
 * @memberof Todo
 */
getTitle(): string {
  return this.title;
}

/**
 * switch status
 * @memberof Todo
 */
 toggleCompletion(): void {
  this.completed = !this.completed;
}

/**
 * edit mode
 * @private
 * @memberof Todo
 */
 private editMode = false;

 /**
 * get edit mode
 * @readonly
 * @type {boolean}
 * @memberof Todo
 */
get editing(): boolean {
  return this.editMode;
}

/**
 * set editmode
 * @memberof Todo
 */
set editable(bl: boolean) {
  this.editMode = bl;
}

/**
* set edit item title
* @param {string} title
* @memberof Todo
*/
setTitle(title: string): void {
  this.title = title;
}

setCompleted(completed: boolean): void {
  this.completed = completed;
}




}
