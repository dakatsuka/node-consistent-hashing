var should = require('should');
var ConsistentHashing = require('../');

describe('ConsistentHashing', function() {
  var nodes = ["node1", "node2", "node3"];

  before(function(done) {
    Array.prototype.contains = function(value) {
      for (var i in this) {
        if (this.hasOwnProperty(i) && this[i] == value) {
          return true;
        }
      }
      return false;
    };
    done();
  });

  it('should be set default values', function(done) {
    var cons = new ConsistentHashing(nodes);
    cons.replicas.should.equal(160);
    cons.algorithm.should.equal('md5');
    done();
  });

  it('should be able to change value of replicas', function(done) {
    var cons  = new ConsistentHashing(nodes, { replicas: 300 });
    cons.replicas.should.equal(300);
    done();
  });

  it('should be able to change algorithm', function(done) {
    var cons  = new ConsistentHashing(nodes, { algorithm: 'sha1' });
    cons.algorithm.should.equal('sha1');
    done();
  });

  it('should add nodes', function(done) {
    var cons = new ConsistentHashing(nodes);
    cons.addNode("node4");
    cons.nodes.contains("node4").should.be.true;
    cons.keys.length.should.equal(cons.replicas * 4);
    done();
  });

  it('should remove node', function(done) {
    var cons = new ConsistentHashing(nodes);
    cons.removeNode("node1");
    cons.nodes.contains("node1").should.be.false;
    cons.keys.length.should.equal(cons.replicas * 2);
    done();
  });

  it('should create an array for sort', function(done) {
    var cons = new ConsistentHashing(nodes);
    cons.keys.length.should.equal(cons.replicas * nodes.length);
    done();
  });

  it('should get a node from key', function(done) {
    var cons = new ConsistentHashing(nodes);
    cons.getNode('A').should.equal("node3");
    cons.getNode('B').should.equal("node1");
    cons.getNode('C').should.equal("node1");
    done();
  });
});
