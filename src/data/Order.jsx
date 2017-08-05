import Immutable from 'immutable';

const Order = Immutable.Record({
  id: '',
  complete: false,
  text: '',
});

export default Order;
