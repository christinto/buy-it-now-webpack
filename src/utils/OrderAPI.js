var request = require('superagent');

import ShoppingCartServerActions from '../actions/ShoppingCartServerActions'

import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import constants from 'constants';

var chars ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";

var generateKey = function generateKey(keyLength){
  var randomstring = '';

  for (var i=0; i < keyLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
};

var encrypt = function encrypt(dataObject, publicKey) {

  // Create a new encryption key (with a specified length)
  var key = generateKey(50);
  // convert data to a json string
  var dataAsString = JSON.stringify(dataObject);
  // encrypt the data symmetrically
  // (the cryptojs library will generate its own 256bit key!!)
  var aesEncrypted = CryptoJS.AES.encrypt(dataAsString, key);
  // get the symmetric key and initialization vector from
  // (hex encoded) and concatenate them into one string
  var aesKey = aesEncrypted.key + ":::" + aesEncrypted.iv;

  console.log(aesKey);

  // the data is base64 encoded
  var encryptedMessage = aesEncrypted.toString();

  var encryptedKey = crypto.publicEncrypt({
    key: publicKey,
    padding: constants.RSA_PKCS1_PADDING
  },
  Buffer.from(aesKey)).toString('hex');

  console.log('encryptedKey');

  // encryptedKey = encryptedKey.toString('base64');

  // and concatenate our payload message
  var payload = encryptedKey + ":::" + encryptedMessage;

  return payload;
};

module.exports = {
  submitOrder: function(order) {

    request.get('http://buyitnow.us-west-2.elasticbeanstalk.com/public-key')
      .end(function(err, response) {
        if (err) return console.error(err);

        // console.log(JSON.parse(response.text));

        var jsonObject = JSON.parse(response.text);

        console.log(jsonObject['key']);

        var payload = order;

        var encryptedPayload = encrypt(payload, jsonObject['key']);

        console.log(encryptedPayload);

        window.web3.bzz.setProvider("http://swarm-gateways.net");
        // window.web3.bzz.setProvider("http://swrm.io");

        window.web3.bzz.upload(encryptedPayload).then(function(hash) {
          console.log("upload", hash);

          var url = "http://swarm-gateways.net/bzzr:/" + hash;
          console.log(url);

          ShoppingCartServerActions.prepareOrder(hash);
        });

        request.post('http://buyitnow.us-west-2.elasticbeanstalk.com/process-order')
          .set('Accept', 'application/json')
          .send({payload: encryptedPayload})

          .end(function(err, response) {
            if (err) return console.error(err);
            console.log(response);
          });
    });

    // decrypt payload
    // var payload = encrypt({"order_id":1}, publicKey);
    // console.log(payload);
    //
    // decrypt(payload);
    // // decrypt payload
    //

    // Web3ServerActions.retrieveTransactions(sorted);
  }
};
