import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchActionTypes from '../constants/SearchActionTypes';

import SearchResult from '../data/SearchResult';
import SearchResultCounter from '../data/SearchResultCounter';

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
var SearchResultStore = ObjectAssign({}, EventEmitter.prototype, {

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
    case SearchActionTypes.GET_RANDOM_RESPONSE:

      // Construct the new todo string
      // var newTodo = 'Call '
      //   + action.response.results[0].user.name.first
      //   + ' about real estate in '
      //   + action.response.results[0].user.location.city;

      // Add the new todo to the list

      var title = action.response.results["ItemAttributes"]["Title"];


      _store.list.push(title);
      SearchResultStore.emit(CHANGE_EVENT);
      break;
    case SearchActionTypes.FIND_ITEMS_RESPONSE:

        console.log(action.response.results);

        var searchResults = _.map(action.response.results, function(searchResult) {

          console.log(searchResult["ItemAttributes"]["Title"]);

          const id = SearchResultCounter.increment();

          return new SearchResult({
            id,
            title: searchResult["ItemAttributes"]["Title"]
          })
        });

        _store.list = searchResults;
        // _store.list = _.map(action.response.results, function(result) {
        //   return result["ItemAttributes"]["Title"];
        // });

        SearchResultStore.emit(CHANGE_EVENT);
        break;
    default:
      return true;
  }
});

module.exports = SearchResultStore;