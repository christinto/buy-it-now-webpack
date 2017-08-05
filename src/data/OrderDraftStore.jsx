import {ReduceStore} from 'flux/utils';
import OrderActionTypes from './OrderActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

class OrderDraftStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case OrderActionTypes.ADD_ORDER:
        return '';

      case OrderActionTypes.UPDATE_DRAFT:
        return action.text;

      default:
        return state;
    }
  }
}

export default new OrderDraftStore();
