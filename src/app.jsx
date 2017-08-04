import React from 'react';
import '../styles/index.scss';

import Web3 from 'web3';

import Web3StatusComponent from './web3'
import OrderForm from './order'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Buy It Now</h1>
        <p>Ethereum Payment Proxy</p>
        <OrderForm />
        <Web3StatusComponent />
      </div>
    )
  }
}
