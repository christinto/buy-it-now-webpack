var AppDispatcher = require('../dispatcher/AppDispatcher');
import Web3ActionTypes from '../constants/Web3ActionTypes';

module.exports = {
  retrieveTransactions(response) {
    console.log("retrieveTransactions");

    console.log(response);
    AppDispatcher.handleServerAction({
      actionType: Web3ActionTypes.RETRIEVE_ORDERS_RESPONSE,
      response: response
    });
  }
};
