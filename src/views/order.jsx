import React from 'react';

import Helpers from "../helpers/TransactionUtils.js";

var Loader = require('react-loader')

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loaded: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      loaded: false
    });

    console.log(this.state.value);
    console.log(window.web3.version);

    const amount = window.web3.utils.toWei(0.01, 'ether');
    const gas = 650000;
    const gasPrice = window.web3.utils.toWei(20, 'shannon');

    var params = {
      value: amount,
      from: window.authorizedAccount,
      gas: gas,
      gasPrice: gasPrice
    };

    window.contract.methods.submitOrderAndMakeDeposit(this.state.value).send(params, Helpers.getTxHandler({
        onDone: () => {
          console.log("onDone");
        },
        onSuccess: (txid, receipt) => {
          console.log("onSuccess");
          console.log(txid, receipt);

          this.setState({
            loaded: true
          });
        },
        onError: (error) => {
          console.log("onError");

          this.setState({
            loaded: true
          });
        }
      })
    );
  }
  render() {
    var options = {
        lines: 12,
        length: 5,
        width: 3,
        radius: 8,
        scale: 1.00,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'relative'
    };

    return (
      <div>
        <Loader loaded={this.state.loaded} options={options} parentClassName="orderFormLoader">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" placeholder="Reference" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </Loader>
    </div>
    );
  }
}
