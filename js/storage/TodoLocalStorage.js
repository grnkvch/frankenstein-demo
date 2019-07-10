export default class TodoLocalStorage {
  read() {
    return JSON.parse(window.localStorage.getItem('frankenstein')) || [];
  }

  write(todos) {
    window.localStorage.setItem('frankenstein', JSON.stringify(todos));
    var event = new CustomEvent("store-update", { detail: { todos } });
    document.dispatchEvent(event);
  }
}