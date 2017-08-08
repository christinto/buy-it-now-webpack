var AppDispatcher = require('../dispatcher/AppDispatcher');
import ProductActionTypes from '../constants/ProductActionTypes';

module.exports = {
  receiveProduct: function(response) {
    AppDispatcher.handleServerAction({
      actionType: ProductActionTypes.ADD_TO_CART_RESPONSE,
      response: response
    });
  }
};
