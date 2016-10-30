define([
  'intern/chai!assert',
  'intern!object'
], function (
  assert,
  registerSuite
){

console.log("entra", arguments)
  /*var assert = require('intern/chai!assert'),
    registerSuite = require('intern!object');*/
   // file = require(filePath);

  registerSuite(function () {
    // Do put this here! This variable is unique for each environment!
    var counter = 0;

    return {
      name: 'Correct pattern',

      setup: function () {
        app = {
          id: counter++
        };
      },

      'Test the id': function () {
        // The value of `counter` will always be what is expected
        assert.strictEqual(app.id, counter - 1);
      }
    };
  });
});