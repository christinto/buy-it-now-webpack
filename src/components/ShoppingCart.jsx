import React from 'react';
import ShoppingCartStore from '../stores/ShoppingCartStore';
import ShoppingCartActions from '../actions/ShoppingCartActions';

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

    return (
      <div>
        <p className="highlighted">Shopping Cart</p>
        {this.state.list.map(item => (
          <ShoppingCartItem
            key={item.id}
            item={item}
          />
        ))}
        <button className="btn-primary" onClick={onClick}>Process Order</button>
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
          {item.title}
        </label>
      </div>
      <br />
    </li>
  );
}

module.exports = ShoppingCart;
