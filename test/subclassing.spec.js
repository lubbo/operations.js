/*global describe,it,beforeEach */
var Operation;
if (!assert) { // node.js tests
    var assert = require('chai').assert;
    Operation = require('../src/operation').Operation;
    _ = require('underscore');
}
else { // Browser tests
    Operation = op.Operation;
}

describe('subclassing', function () {
    var op;
    it('subclassing', function (done) {
        function MyOperation(completion) {
            if (!this) return new MyOperation(completion);
            Operation.call(this, 'My Awesome Operation', this._start, completion);
            assert.equal(this.work, this._start);
        }

        MyOperation.prototype = Object.create(Operation.prototype);

        MyOperation.prototype._start = function (finished) {
            assert.equal(this, op, 'should be bound correctly');
            assert.ok(typeof(finished) == 'function', 'Callback should be passed');
            this.doSomething();
            this.doSomethingElse();
            finished();
        };

        MyOperation.prototype.doSomething = function () {
            // ...
        };

        MyOperation.prototype.doSomethingElse = function () {
            // ...
        };

        op = new MyOperation(function () {
            done();
        });

        assert.equal(op.name, 'My Awesome Operation');

        op.start();
    });
});