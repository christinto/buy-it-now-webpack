import React from 'react';
import ShoppingCartStore from '../stores/ShoppingCartStore';
import ShoppingCartActions from '../actions/ShoppingCartActions';

import Shipping from '../components/Shipping';

import _ from 'lodash';
import {Loader} from 'react-loader';

var ShoppingCart = React.createClass({
  getInitialState: function() {
    return ShoppingCartStore.getList();
  },
  componentWillMount: function() {
    this.setState(ShoppingCartStore.getList());
  },
  componentDidMount: function() {
    ShoppingCartStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ShoppingCartStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(ShoppingCartStore.getList());
  },
  render: function() {

    const onClick = (event) => {
      var dataStore = ShoppingCartStore.getDataStore();
      ShoppingCartActions.prepareOrder(dataStore);
    };

    var subtotal = 0;
    _.each(this.state.list, function(item) {
      subtotal += item.get('price');
    });

    return (
      <div>
        <p className="highlighted">Shopping Cart</p>
        {this.state.list.map(item => (
          <ShoppingCartItem
            key={item.id}
            item={item}
          />
        ))}
        <h2>Subtotal: {subtotal}</h2>
        <Shipping />

        <button className="btn-primary" onClick={onClick}>Submit Order</button>
      </div>
    );
  }
});

function ShoppingCartItem(props) {
  const {item} = props;
  return (
    <li>
      <div>
        <label>
          {item.title} | {item.quantity} | {item.price}
        </label>
      </div>
      <br />
    </li>
  );
}

module.exports = ShoppingCart;
