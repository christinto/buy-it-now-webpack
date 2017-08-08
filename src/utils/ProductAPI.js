//var ShoppingCartServerActions = require('../actions/ShoppingCartServerActions');
// import ShoppingCartActions from '../actions/ShoppingCartActions';
import ShoppingCartServerActions  from '../actions/ShoppingCartServerActions';

module.exports = {
  addToCart: function(response) {
    console.log(response);
    ShoppingCartServerActions.addToCart(response);
  }
};
