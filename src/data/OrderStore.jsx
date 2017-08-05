import Counter from './Counter';
import Immutable from 'immutable';
import Order from './Order';
import OrderActionTypes from './OrderActionTypes';
import OrderDispatcher from './OrderDispatcher';
import {ReduceStore} from 'flux/utils';


class OrderStore extends ReduceStore {
  constructor() {
    super(OrderDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case OrderActionTypes.ADD_ORDER:
        if (!action.text) {
          return state;
        }

        const id = Counter.increment();
        return state.set(id, new Order({
          id,
          text: action.text,
          complete: false,
        }));

      default:
        return state;
    }
  }
}

export default new OrderStore();
