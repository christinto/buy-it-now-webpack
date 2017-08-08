var ShoppingCartServerActions = require('../actions/ShoppingCartServerActions');

module.exports = {
  checkQuantity: function(response) {
    ShoppingCartServerActions.addQuantity(response);
  }
};
