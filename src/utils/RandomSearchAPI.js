var SearchServerActions = require('../actions/SearchServerActions');
var request = require('superagent');

module.exports = {
  get: function() {
    request.post('http://www.hypewizard.com/api/ask_amazon')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);

        SearchServerActions.receiveRandom(response.body);
      });
  }
};
