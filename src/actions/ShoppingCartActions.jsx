import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

import _ from 'lodash';
import OrderAPI from '../utils/OrderAPI';

const Actions = {
  addToCart(item) {
    AppDispatcher.handleViewAction({
      actionType: ShoppingCartActionTypes.ADD_TO_CART,
    });
  },
  prepareOrder(dataStore) {
    AppDispatcher.handleViewAction({
      actionType: ShoppingCartActionTypes.PREPARE_ORDER,
    });

    var cartItems = dataStore.list;

    var orderItems = _.map(cartItems, function(cartItem) {
      return {
        asin: cartItem.get('asin'),
        quantity: cartItem.get('quantity')
      };
    });

    var order = {
      'items': orderItems
    }

    OrderAPI.submitOrder(order);
  }
}

export default Actions;
