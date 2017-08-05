import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchActionTypes from '../constants/SearchActionTypes';
import RandomSearchAPI from '../utils/RandomSearchAPI';
import SearchAPI from '../utils/SearchAPI';

const Actions = {
  findItems(query) {
    AppDispatcher.handleViewAction({
      actionType: SearchActionTypes.FIND_ITEMS,
    });

    SearchAPI.findItems(query);
  },
  getRandom() {
    AppDispatcher.handleViewAction({
      actionType: SearchActionTypes.GET_RANDOM,
    });

    RandomSearchAPI.get();
  }
}

export default Actions;
