var Web3ServerActions = require('../actions/Web3ServerActions');
var request = require('superagent');

import interfaces from "../smart-contract/interfaces.js";

function retrieveOrder(index, callback) {
  var orders = [];

  var contract = new window.web3.eth.Contract(interfaces.registrarInterface);
  contract.options.address = "0x59b18ece115c3a9c8131e41a5da89b570f6de55e"; // Ropsen BuyItNow

  contract.methods.getOrder(index.toString()).call({}, function(error, result) {
    var state = "open";

    switch(result[0].toString()) {
      case "0":
        state = "open";
        break;
      case "1":
        state = "closed";
        break;
    }

    var date = new Date(result[1] * 1000);

    console.log("result", result);

    var order = {
      index: index,
      state: state,
      date: date,
      amount: result[3],
      referenceHash: result[4].toString()
    };

    callback(order);
  });
}

function eachAsync(array, f, callback) {
  var doneCounter = 0, results = [];

  array.forEach(function (item) {
    f(item, function (res) {
      doneCounter += 1;
      results.push(res);

      if (doneCounter === array.length) {
        callback(results);
      }
    });
  });
}

module.exports = {
  retrieveTransactions: function() {
    var contract = new window.web3.eth.Contract(interfaces.registrarInterface);
    contract.options.address = "0x59b18ece115c3a9c8131e41a5da89b570f6de55e"; // Ropsen BuyItNow

    contract.methods.getOrderCount().call({}, function(error, result) {
      var index = result - 1;

      var orderIndices = Array.from({length: result}, (v, k) => k);
      orderIndices.reverse();

      function sort(orders) {
        var sorted = _.sortBy(orders, function(order) {
          return - (order.date.getTime());
        });

        Web3ServerActions.retrieveTransactions(sorted);
      }

      eachAsync(orderIndices, retrieveOrder, sort);
    });
  }
};
