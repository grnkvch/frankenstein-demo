import _ from 'lodash';

export default class TodoService {
  constructor(todoStorage) {
    this._storage = todoStorage;

    this._todos = this._storage.read();
  }

  all() {
    return this._storage.read();
  }

  generateid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  create(todo) {
    const updatedTodo = _.extend({
      id: this.generateid(5),
      completed: false
    }, todo);

    this._todos.unshift(updatedTodo);

    this._updateStorage();
  }

  update(todo) {
    const todos = this.all();
    const stored = _.find(todos, {id: todo.id});

    _.extend(stored, todo);

    this._todos = todos;

    this._updateStorage();
  }

  destroy(todo) {
    const todos = this.all();
    const toDestroy = _.find(todos, {id: todo.id});

    this._todos = _.without(todos, toDestroy);

    this._updateStorage();
  }

  _updateStorage() {
    this._storage.write(this._todos);
  }
}
