var AppDispatcher = require('../dispatcher/AppDispatcher');
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

module.exports = {
  addQuantity: function(response) {
    AppDispatcher.handleServerAction({
      actionType: ShoppingCartActionTypes.ADD_QUANTITY,
      response: response
    });
  }
};
