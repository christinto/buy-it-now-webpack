var request = require('superagent');

import ShoppingCartServerActions from '../actions/ShoppingCartServerActions'

import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import constants from 'constants';

var chars ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";

var generateKey = function generateKey(keyLength){
  var randomString = '';

  for (var i=0; i < keyLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum+1);
  }

  localStorage.setItem('key', randomString)

  return randomString;
};

var encrypt = function encrypt(dataObject, publicKey) {
  // Create a new encryption key (with a specified length)

  var key;
  if (localStorage.getItem('key') === null) {
    console.log('key not detected');
    key = generateKey(64);
  } else {
    console.log('key detected');
    key = localStorage.getItem('key');
  }

  console.log(key);

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
function uploadPayload(order) {

  var publicKey = localStorage.getItem('publicKey');
  var identifier = localStorage.getItem('identifier');

  var payload = {
    order: order,
    identifier: identifier
  };

  var encryptedPayload = encrypt(payload, publicKey);

  console.log(encryptedPayload);

  window.web3.bzz.setProvider("http://swarm-gateways.net");
  // window.web3.bzz.setProvider("http://swrm.io");

  window.web3.bzz.upload(encryptedPayload).then(function(hash) {
    console.log("upload", hash);

    var url = "http://swarm-gateways.net/bzzr:/" + hash;
    console.log(url);

    ShoppingCartServerActions.prepareOrder(hash);
  });
};
module.exports = {
  submitOrder: function(order) {
    if (localStorage.getItem('publicKey') === null || localStorage.getItem('identifier') === null) {
      request.get('http://buyitnow.us-west-2.elasticbeanstalk.com/public-key')
        .end(function(err, response) {
          if (err) return console.error(err);

          // console.log(JSON.parse(response.text));

          var jsonObject = JSON.parse(response.text);

          var publicKey = jsonObject['key'];
          var identifier = jsonObject['identifier'];

          console.log("publicKey: ", publicKey);
          console.log("identifier: ", identifier);

          localStorage.setItem('publicKey', publicKey);
          localStorage.setItem('identifier', identifier);

          uploadPayload(order);
      });
    } else {
      uploadPayload(order);
    };
  },
  pullHistory: function() {
    if (localStorage.getItem('identifier') === null) {

    } else {
      var identifier = localStorage.getItem('identifier');
      request.get('http://buyitnow.us-west-2.elasticbeanstalk.com/history/' + identifier)
        .end(function(err, response) {
          if (err) return console.error(err);
          var jsonObject = JSON.parse(response.text);
          console.log(jsonObject);
      });
    }
  }
};
