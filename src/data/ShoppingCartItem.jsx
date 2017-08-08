import Immutable from 'immutable';

const ShoppingCartItem = Immutable.Record({
  id: '',
  asin: '',
  title: '',
  quantity: 0
});

export default ShoppingCartItem;
