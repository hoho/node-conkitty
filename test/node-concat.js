// Wrapper to run concat.js browser qunit tests in Node.JS.

var path = require('path');
var concatjs = require(path.join(__dirname, '../node-concat.js'));
var should = require('should');
require('mocha');


var document = concatjs.window.document;
var $C = concatjs.$C;


// Monkey-patch qunit deepEqual function.
global.deepEqual = function(actual, expected, message) {
    should(actual).eql(expected, message);
};


global.$C = $C;
global.document = document;


// Monkey-patch getElementById, it is only used in tests to get container.
document.getElementById = function() {
    return document.createElement('div');
};


describe('concat.js for Node.JS:', function() {
    function test(description, func) {
        it(description, function(done) {
            func();
            done();
        });
    }

    // Monkey patch qunit test function.
    global.test = test;

    require(path.join(path.dirname(require.resolve('concat.js')), 'test/test.js'));
});
