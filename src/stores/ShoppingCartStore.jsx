import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';

import ShoppingCartItem from '../data/ShoppingCartItem';
import ShoppingCartItemCounter from '../data/ShoppingCartItemCounter';

import _ from 'lodash'

var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// Define the store as an empty array
var _store = {
  list: []
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
var ShoppingCartStore = ObjectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getList: function() {
    return _store;
  }
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ShoppingCartActionTypes.ADD_QUANTITY:

      // var title = action.response.results["ItemAttributes"]["Title"];
      //
      //

      var title = action.response.title;

      console.log(title);

      const id = ShoppingCartItemCounter.increment();

      var shoppingCartItem = new ShoppingCartItem({
        id,
        title: title
      });

      _store.list.push(shoppingCartItem);

      ShoppingCartStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ShoppingCartStore;
