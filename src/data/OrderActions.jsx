import OrderActionTypes from './OrderActionTypes';
import OrderDispatcher from './OrderDispatcher';

const Actions = {
  addOrder(text) {
    OrderDispatcher.dispatch({
      type: OrderActionTypes.ADD_ORDER,
      text,
    });
  },

  updateDraft(text) {
    console.log(text);
    
    OrderDispatcher.dispatch({
      type: OrderActionTypes.UPDATE_DRAFT,
      text,
    });
  }
}

export default Actions;
