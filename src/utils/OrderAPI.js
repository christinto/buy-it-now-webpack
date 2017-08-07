var request = require('superagent');

import CryptoJS from 'crypto-js';
import {JSEncrypt} from 'jsencrypt';
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

var publicKey = "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxNo2t88Kh5vEsA2+/aKEwUsW71u7Kx+2bYK5QBOOcgFz0cKTQci2Lrx04lP8fBiVX7fRmjNbnrx8yRaEUfPIA9FIgpIb8XMwcsgYRNXegLJlMxXVCOJn87d3TrRsXIvjk6ItbR/HgLoa9rq0uT0ILzLxWtdn5ofnT7hCn06F8sSxosOVqWq+EKqD3DoEDe/bRLc/19NQzhEA0JGedOyflSwvEPMgL1fnc3CbM2GfZh0dChML3rCMKVxDCU7mYTW6ydOczqhuuuVQV9qAMq8M5z2xak0f56orZKMfhITFDB45eg4tQ9wLvhOGCiEIOXdI8krHRKNOsaSc/VmBkUVIzz+SVUQ+DRaGN5KfqTNvC7PQFZ0ew5FVNGkO0KTqzvvigXyyUwjhcPCZ5xDCJ12zrbpBYBq4UKIjWkPZgKSnxyh5AaWhLjshkKSc7PHKH8X1ILYUwCq/9E8kcmFjTzOUZ+KfGrLDdq2oPDPsPQ3EGJpaAW/85fuWmcxOynPQOBj0MwlBHXDijF1+k5pbBuzSoa2TbyVtk5Oh7WGpwDSxYngjoFZqopRox34B3l3MIUtcn+HtXq46/oVQjenhUQwMCPDvjROu5V42Qdps7iwfiNus4+YWJkxHI8ebvJ7tAI+9eUoy/Au8H1PZJRAfm4fb3oqnzNlIqJ3KU9h2UPfXUjECAwEAAQ==-----END PUBLIC KEY-----";

var privateKey = "-----BEGIN RSA PRIVATE KEY-----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-----END RSA PRIVATE KEY-----";

// var encrypt = function encrypt(dataObject, publicKey) {
//
//   // Create a new encryption key (with a specified length)
//   var key = generateKey(50);
//   // convert data to a json string
//   var dataAsString = JSON.stringify(dataObject);
//   // encrypt the data symmetrically
//   // (the cryptojs library will generate its own 256bit key!!)
//   var aesEncrypted = CryptoJS.AES.encrypt(dataAsString, key);
//   // get the symmetric key and initialization vector from
//   // (hex encoded) and concatenate them into one string
//   var aesKey = aesEncrypted.key + ":::" + aesEncrypted.iv;
//
//   console.log(aesKey);
//
//   // the data is base64 encoded
//   var encryptedMessage = aesEncrypted.toString();
//
//   // we create a new JSEncrypt object for rsa encryption
//   var rsaEncrypt = new JSEncrypt();
//
//   // we set the public key (which we passed into the function)
//   rsaEncrypt.setPublicKey(publicKey);
//   // now we encrypt the key & iv with our public key
//   var encryptedKey = rsaEncrypt.encrypt(aesKey);
//   // and concatenate our payload message
//   var payload = encryptedKey + ":::" + encryptedMessage;
//
//   return payload;
// };

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

  // // we create a new JSEncrypt object for rsa encryption
  // var rsaEncrypt = new JSEncrypt();
  // // we set the public key (which we passed into the function)
  // rsaEncrypt.setPublicKey(publicKey);
  // // now we encrypt the key & iv with our public key
  // var encryptedKey = rsaEncrypt.encrypt(aesKey);

  // var absolutePath = path.resolve('./keys/rsa_4096_pub.pem');
  // var publicKey = fs.readFileSync(absolutePath, 'utf8');

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

var decrypt = function decrypt(payload) {
  var parts = payload.split(":::");

  var encryptedKey = parts[0];
  var encryptedMessage = parts[1];

  console.log(encryptedKey, encryptedMessage);

  // we create a new JSEncrypt object for rsa encryption
  var rsaDecrypt = new JSEncrypt();

  // we set the public key (which we passed into the function)
  rsaDecrypt.setPrivateKey(privateKey);

  // now we encrypt the key & iv with our public key
  var decryptedKey = rsaDecrypt.decrypt(encryptedKey);

  console.log(decryptedKey);

  var parts = decryptedKey.split(":::");

  var key = CryptoJS.enc.Hex.parse(parts[0]),
      iv = CryptoJS.enc.Hex.parse(parts[1]),
      cipher = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encryptedMessage)
      });

  var decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key, {iv: iv});

  var jsonObject = JSON.parse(decryptedMessage.toString(CryptoJS.enc.Utf8));
  console.log(jsonObject);
}

module.exports = {
  prepareOrder: function() {

    request.get('http://buyitnow.us-west-2.elasticbeanstalk.com/public-key')
      .end(function(err, response) {
        if (err) return console.error(err);

        // console.log(JSON.parse(response.text));

        var jsonObject = JSON.parse(response.text);

        console.log(jsonObject['key']);

        var payload = encrypt({'hello': 'world'}, jsonObject['key']);

        console.log(payload);

        request.post('http://buyitnow.us-west-2.elasticbeanstalk.com/process-order')
          .set('Accept', 'application/json')
          .send({payload: payload})

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
    // window.web3.bzz.setProvider("http://swarm-gateways.net");
    // // window.web3.bzz.setProvider("http://swrm.io");
    //
    // window.web3.bzz.upload({"test":"test"}).then(function(hash) {
    //   console.log("upload", hash);
    // });

    // Web3ServerActions.retrieveTransactions(sorted);
  }
};
