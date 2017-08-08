var AppDispatcher = require('../dispatcher/AppDispatcher');
import SearchActionTypes from '../constants/SearchActionTypes';

module.exports = {

  receiveRandom: function(response) {
    AppDispatcher.handleServerAction({
      actionType: SearchActionTypes.GET_RANDOM_RESPONSE,
      response: response
    });
  },
  receiveSearchResults: function(response) {
    AppDispatcher.handleServerAction({
      actionType: SearchActionTypes.FIND_ITEMS_RESPONSE,
      response: response
    });
  }
};
