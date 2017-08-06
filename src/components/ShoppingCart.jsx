import React from 'react';
import ShoppingCartStore from '../stores/ShoppingCartStore';

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
    console.log(ShoppingCartStore.getList());
    this.setState(ShoppingCartStore.getList());
  },
  render: function() {
    return (
      <div>
        <p className="highlighted">Shopping Cart</p>
        {this.state.list.map(item => (
          <ShoppingCartItem
            key={item.id}
            item={item}
          />
        ))}
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
    </li>
  );
}

module.exports = ShoppingCart;
