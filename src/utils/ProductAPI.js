var ShoppingCartServerActions = require('../actions/ShoppingCartServerActions');

module.exports = {
  checkQuantity: function(response) {

    console.log("checkQuantity", response);

    ShoppingCartServerActions.addQuantity(response);
  }
};
