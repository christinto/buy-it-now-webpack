import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import OrderActions from '../data/OrderActions';
import OrderDraftStore from '../data/OrderDraftStore';
// import TodoEditStore from '../data/TodoEditStore';
import OrderStore from '../data/OrderStore';

function getStores() {
  return [
    // TodoEditStore,
    OrderDraftStore,
    OrderStore,
  ];
}

function getState() {
  return {
    draft: OrderDraftStore.getState(),
    // editing: TodoEditStore.getState(),
    orders: OrderStore.getState(),

    onAdd: OrderActions.addOrder,
    // onDeleteCompletedTodos: TodoActions.deleteCompletedTodos,
    // onDeleteTodo: TodoActions.deleteTodo,
    // onEditTodo: TodoActions.editTodo,
    // onStartEditingTodo: TodoActions.startEditingTodo,
    // onStopEditingTodo: TodoActions.stopEditingTodo,
    // onToggleAllTodos: TodoActions.toggleAllTodos,
    // onToggleTodo: TodoActions.toggleTodo,
    onUpdateDraft: OrderActions.updateDraft,
  };
}

export default Container.createFunctional(AppView, getStores, getState);
