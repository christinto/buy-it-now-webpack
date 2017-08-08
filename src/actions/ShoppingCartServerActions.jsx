var AppDispatcher = require('../dispatcher/AppDispatcher');
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

module.exports = {
  addToCart: function(response) {
    AppDispatcher.handleServerAction({
      actionType: ShoppingCartActionTypes.ADD_TO_CART_RESPONSE,
      response: response
    });
  },
  prepareOrder: function(response) {    
    AppDispatcher.handleServerAction({
      actionType: ShoppingCartActionTypes.PREPARE_ORDER_RESPONSE,
      response: response
    });
  }
};
