var crypto = require('crypto');


var ConsistentHashing = function(nodes, options) {
  this.replicas  = 160;
  this.algorithm = 'md5'
  this.ring  = {};
  this.keys  = [];
  this.nodes = [];

  if (options && options.replicas)  this.replicas  = options.replicas;
  if (options && options.algorithm) this.algorithm = options.algorithm;

  for (var i = 0; i < nodes.length; i++) {
    this.addNode(nodes[i]);
  }
};


ConsistentHashing.prototype.addNode = function(node) {
  this.nodes.push(node);

  for (var i = 0; i < this.replicas; i++) {
    var key = this.crypto((node.id || node) + ':' + i);

    this.keys.push(key);
    this.ring[key] = node;
  }

  this.keys.sort();
};


ConsistentHashing.prototype.removeNode = function(node) {
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i] == node) {
      this.nodes.splice(i, 1);
      i--;
    }
  }

  for (var i = 0; i < this.replicas; i++) {
    var key = this.crypto((node.id || node) + ':' + i);
    delete this.ring[key];

    for (var j = 0; j < this.keys.length; j++) {
      if (this.keys[j] == key) {
        this.keys.splice(j, 1);
        j--;
      }
    }
  }
};


ConsistentHashing.prototype.getNode = function(key) {
  if (this.getRingLength() == 0) return 0;

  var hash = this.crypto(key);
  var pos  = this.getNodePosition(hash);

  return this.ring[this.keys[pos]];
};


ConsistentHashing.prototype.getNodePosition = function(hash) {
  var upper = this.getRingLength();
  var lower = 0;
  var idx   = 0;

  if (upper == 0) return 0;

  while (lower <= upper) {
    idx  = Math.floor((lower + upper) / 2);
    comp = this.compare(this.keys[idx], hash);

    if (comp == 0) {
      return idx;
    } else if (comp > 0) {
      upper = idx - 1;
    } else {
      lower = idx + 1;
    }
  }

  if (upper < 0) {
    upper = this.getRingLength();
  }

  return upper;
};


ConsistentHashing.prototype.getRingLength = function() {
  var i = 0;
  for (var key in this.ring) { i++ }
  return i;
};


ConsistentHashing.prototype.compare = function(v1, v2) {
  return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
};


ConsistentHashing.prototype.crypto = function(str) {
  return crypto.createHash(this.algorithm).update(str).digest('hex');
};


module.exports = ConsistentHashing;
