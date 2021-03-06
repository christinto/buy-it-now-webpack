import React from 'react';
import '../../styles/index.scss';

import Web3StatusComponent from './web3'

import Search from '../components/Search'
import Transactions from '../components/Transactions'
import Checkout from '../components/Checkout';
import ShoppingCart from '../components/ShoppingCart';

import SearchActions from '../actions/SearchActions';


function AppView(props) {
  return (
    <div>
      <Header {...props} />

      <SearchForm />
      <Search />

      <ShoppingCart />

      <Checkout />

      <Main {...props} />
      <Web3StatusComponent />

      <Transactions />
    </div>
  );
}

function Header(props) {
  return (
    <header id="header">
      <h1>Buy It Now</h1>
      <p>Ethereum Payment Proxy</p>
    </header>
  );
}

function Main(props) {
  if (props.orders.size === 0) {
    return null;
  }

  // If this were expensive we could move it to the container.
  const areAllComplete = props.orders.every(order => order.complete);

  return (
    <section id="main">
      <ul id="order-list">
        {[...props.orders.values()].reverse().map(order => (
          <OrderItem
            key={order.id}
            order={order}
          />
        ))}
      </ul>
    </section>
  );
}

function OrderItem(props) {
  const {order} = props;

  // console.log(order.text);

  return (
    <li>
      <div>
        <label>
          {order.text}
        </label>
      </div>
    </li>
  );
}

function SearchForm() {

  SearchActions.findItems("Bitcoin");

  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      SearchActions.findItems(event.target.value);
    }
  };
  return (
    <div>
      <input
        type="text"
        autoFocus={true}
        id="new-query"
        placeholder="Enter Query"
        defaultValue="Bitcoin"
        onKeyDown={onKeyDown}
      />
      <br />
    </div>
  );
}

export default AppView;
