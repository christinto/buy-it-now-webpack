import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

import ShoppingCartItem from '../data/ShoppingCartItem';
import ShoppingCartItemCounter from '../data/ShoppingCartItemCounter';

import _ from 'lodash'

var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var ShoppingCartStore = ObjectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getList: function() {
    return _store;
  },

  getDataStore: function() {
    return _store;
  }
});

AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ShoppingCartActionTypes.ADD_QUANTITY:

      var asin = action.response.asin;
      var title = action.response.title;
      var quantity = 1;

      const id = ShoppingCartItemCounter.increment();

      var shoppingCartItem = new ShoppingCartItem({
        id,
        title: title,
        asin: asin,
        quantity: quantity
      });

      _store.list.push(shoppingCartItem);

      ShoppingCartStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ShoppingCartStore;
