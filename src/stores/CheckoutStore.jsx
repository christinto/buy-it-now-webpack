import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  hash: ""
};

var CheckoutStore = ObjectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getDataStore: function() {
    return _store;
  }
});

AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ShoppingCartActionTypes.PREPARE_ORDER_RESPONSE:

      console.log('ShoppingCartActionTypes.PREPARE_ORDER_RESPONSE');

      _store.hash = action.response;

      CheckoutStore.emit(CHANGE_EVENT);
      break;
  default:
    return true;
  }
});

module.exports = CheckoutStore;
