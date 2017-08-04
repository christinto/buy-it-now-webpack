import Web3 from 'web3';
import React from 'react';

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
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
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();


    console.log(window.web3.version);
    console.log(window.web3.eth.currentProvider);

    if (window.web3.eth.currentProvider.isConnected()) {
      console.log("connected");
    } else {
      console.log("not connected");
    }
    window.web3.eth.getAccounts().then(console.log);

    //

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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
