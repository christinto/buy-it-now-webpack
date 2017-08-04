/**
* @title BuyItNow Smart Contract
* @url http://buyitnow.international
* @version 0.1.0
*/

pragma solidity ^0.4.11;

contract Deposit {
  address public registrar;

  address constant burn = 0xdead;

  uint public creationDate;

  address public owner;
  uint public value;

  bool active;

  event BalanceTransfered(address indexed account);

  function Deposit(address _owner) payable {
    owner = _owner;
    registrar = msg.sender;
    creationDate = now;
    active = true;
    value = msg.value;
  }

  modifier onlyRegistrar {
    if (msg.sender != registrar) throw;
    _;
  }

  modifier onlyActive {
    if (!active) throw;
    _;
  }

  function setRegistrar(address _registrar) onlyRegistrar {
    registrar = _registrar;
  }
  
  function withdraw(address account) onlyRegistrar {
    account.transfer(this.balance);

    BalanceTransfered(account);
  }
}

contract Registrar {

  uint public registrarStartDate;
  address public node;
  uint public fee;

  uint constant minPrice = 0.01 ether;

  enum Mode { Open, Closed }

  struct order {
    uint createdAt;
    address[] depositors;
    uint amount;
    bytes32 referenceHash;
  }

  order[] public orders;
  mapping (address => mapping(uint => Deposit)) public deposits;

  event OrderCreated(uint indexed index, uint createdAt);
  event NewDeposit(uint indexed index, address indexed account, uint amount);

  function Registrar() {
    registrarStartDate = now;
    node = msg.sender;
  }

  modifier onlyRegistrar {
    if (msg.sender != node) throw;
    _;
  }

  function state(uint index) constant returns (Mode) {
    var order = orders[index];

    return Mode.Open;
  }

  modifier inState(uint _index, Mode _state) {
    if(state(_index) != _state) throw;
    _;
  }

  function getOrder(uint index) constant returns (Mode, uint, address[], uint, bytes32) {
    order o = orders[index];

    address[] memory owners = new address[](o.depositors.length);

    for (uint i = 0; i < o.depositors.length; i++) {
      owners[i] = o.depositors[i];
    }

    return (state(index), o.createdAt, owners, o.amount, o.referenceHash);
  }

  function getOrderCount() public constant returns (uint) {
    return orders.length;
  }

  function createOrder(bytes32 referenceHash) constant returns (uint) {
    uint index = orders.length;

    orders.push(order(now, new address[](0), 0, referenceHash));

    OrderCreated(index, now);

    return index;
  }

  function newDeposit(uint index) payable {
    if (msg.value < minPrice) throw;

    if (address(deposits[msg.sender][index]) > 0 ) throw;

    Deposit newDeposit = (new Deposit).value(msg.value)(msg.sender);

    deposits[msg.sender][index] = newDeposit;

    order o = orders[index];

    o.depositors.push(msg.sender);

    o.amount = o.amount + msg.value;

    NewDeposit(index, msg.sender, msg.value);
  }

  function submitOrderAndMakeDeposit(bytes32 referenceHash) payable {
    uint index = createOrder(referenceHash);
    newDeposit(index);
  }
}
