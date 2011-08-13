var testCase = require('nodeunit').testCase,
    ConsistentHashing = require('..');

var nodes = ["node1", "node2", "node3"];

module.exports = testCase({
  setUp: function(callback) {
    Array.prototype.contains = function(value) {
      for (var i in this) {
        if (this.hasOwnProperty(i) && this[i] == value) {
          return true;
        }
      }
      return false;
    };
    callback();
  },

  'should be set default values': function(test) {
    var cons = new ConsistentHashing(nodes);
    test.equal(cons.replicas, 160);
    test.equal(cons.algorithm, 'md5');
    test.done();
  },

  'should be able to change value of replicas': function(test) {
    var cons  = new ConsistentHashing(nodes, { replicas: 300 });
    test.equal(cons.replicas, 300);
    test.done();
  },

  'should be able to change algorithm': function(test) {
    var cons  = new ConsistentHashing(nodes, { algorithm: 'sha1' });
    test.equal(cons.algorithm, 'sha1');
    test.done();
  },

  'should add nodes': function(test) {
    var cons = new ConsistentHashing(nodes);
    cons.addNode("node4");
    test.equal(cons.nodes.contains("node4"), true);
    test.equal(cons.keys.length, cons.replicas * 4);
    test.done();
  },

  'should remove node': function(test) {
    var cons = new ConsistentHashing(nodes);
    cons.removeNode("node1");
    test.equal(cons.nodes.contains("node1"), false);
    test.equal(cons.keys.length, cons.replicas * 2);
    test.done();
  },

  'should create an array for sort': function(test) {
    var cons = new ConsistentHashing(nodes);
    test.equal(cons.keys.length, cons.replicas * nodes.length);
    test.done();
  },

  'should get a node from key': function(test) {
    var cons = new ConsistentHashing(nodes);
    test.equal(cons.getNode('A'), "node3");
    test.equal(cons.getNode('B'), "node1");
    test.equal(cons.getNode('C'), "node1");
    test.done();
  }
});
