var AppDispatcher = require('../dispatcher/AppDispatcher');
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

module.exports = {
  addQuantity: function(response) {
    console.log('addQuantity');

    AppDispatcher.handleServerAction({
      actionType: ShoppingCartActionTypes.ADD_QUANTITY,
      response: response
    });
  }
};
