import OrderActionTypes from './OrderActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const Actions = {
  addOrder(text) {
    AppDispatcher.dispatch({
      type: OrderActionTypes.ADD_ORDER,
      text,
    });
  },

  updateDraft(text) {
    AppDispatcher.dispatch({
      type: OrderActionTypes.UPDATE_DRAFT,
      text,
    });
  }
}

export default Actions;
