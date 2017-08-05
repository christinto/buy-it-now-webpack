import {ReduceStore} from 'flux/utils';
import OrderActionTypes from './OrderActionTypes';
import OrderDispatcher from './OrderDispatcher';

class OrderDraftStore extends ReduceStore {
  constructor() {
    super(OrderDispatcher);
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
