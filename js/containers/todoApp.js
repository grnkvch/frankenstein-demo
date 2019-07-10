import _ from 'lodash';

const todoApp = () => ({
  template: `
    <div>
      <section class="todoapp">
        <frankenstein-header-wrapper></frankenstein-header-wrapper>
        <frankenstein-listing-wrapper></frankenstein-listing-wrapper>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </div>
  `,
  controller: class {
    constructor(todoService) {
      this.selectedFilter = 'all';
      this.todoService = todoService;
      this._todos = todoService.all();
      this.updateState();
    }

    updateState() {
      this._activeTodos = _.filter(this._todos, t => !t.completed);

      switch (this.selectedFilter) {
        case 'active':
          this._filteredTodos = _.filter(this._todos, t => !t.completed);
          break;
        case 'completed':
          this._filteredTodos = _.filter(this._todos, t => t.completed);
          break;
        default:
          this._filteredTodos = this._todos;
      }
    }

    handleAdd(todo) {
      this.todoService.create(todo);
      this._todos = this.todoService.all();
      this.updateState();
    }

    handleUpdate(todo) {
      this.todoService.update(todo);
      this._todos = this.todoService.all();
      this.updateState();
    }

    handleSave(todo) {
      this.todoService.update(todo);
      this._todos = this.todoService.all();
      this.updateState();
    }

    handleDestroy(todo) {
      this.todoService.destroy(todo);
      this._todos = this.todoService.all();
      this.updateState();
    }

    updateFilter(filter) {
      this.selectedFilter = filter;
      this.updateState();
    }

    updateTodos() {
      this._todos = this.todoService.all();
      this.updateState();
    }
  },
  restrict: 'E',
  bindToController: true,
  controllerAs: 'todoApp',
  link: function(scope, elem, attr, ctrl) {
    document.addEventListener('store-update', storeUpdateHandler, false);
    scope.$on('$destroy', function() {
      document.removeEventListener('store-update', storeUpdateHandler);
    });

    function storeUpdateHandler() {
      _.defer(function() {
        scope.$apply(ctrl.updateTodos.bind(ctrl));
      });
    }
  },
});

export default todoApp;
