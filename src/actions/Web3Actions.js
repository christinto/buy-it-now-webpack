import AppDispatcher from '../dispatcher/AppDispatcher';
import Web3ActionTypes from '../constants/Web3ActionTypes';
import Web3API from '../utils/Web3API';

const Actions = {
  retrieveTransactions() {
    AppDispatcher.handleViewAction({
      actionType: Web3ActionTypes.RETRIEVE_ORDERS,
    });

    Web3API.retrieveTransactions();
  }
}

export default Actions;
