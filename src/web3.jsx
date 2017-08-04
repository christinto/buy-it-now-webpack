import React from 'react';
import Web3 from 'web3';
import '../styles/index.scss';

import interfaces from "../smart-contract/interfaces.js";

export default class Web3StatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: ''
    };
  }
  componentWillMount() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }
  componentDidMount() {
    if (window.web3.eth.currentProvider.isConnected()) {
      console.log("web3 connected");
    } else {
      console.log("web3 not connected");
    }

    console.log(window.web3.version);
    console.log(window.web3.eth.currentProvider);

    this.setState({version: window.web3.version});

    window.web3.eth.getAccounts().then(console.log);

    console.log("connect contract START");

    console.log(interfaces);

    var contract = new window.web3.eth.Contract(interfaces.registrarInterface);
    contract.options.address = "0xbb352b1766e4bcae93d612087bade0bd1350ecea"; // Ropsen Pay2Play

    contract.methods.registrarStartDate().call({}, function(error, result) {
      console.log(error, result);
    });

    console.log("connect contract END");
  }
  render() {
    return (
      <div>
        <p className="highlighted">Web3 Status</p>
        <p>Version: {this.state.version}</p>
      </div>
    );
  }
}
