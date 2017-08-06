import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

const Actions = {
  addToCart(item) {
    console.log("item", item);

    AppDispatcher.handleViewAction({
      actionType: ShoppingCartActionTypes.ADD_TO_CART,
    });

    // SearchAPI.findItems(query);
  }
}

export default Actions;
