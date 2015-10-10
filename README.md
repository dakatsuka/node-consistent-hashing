# node-consistent-hashing [![Build Status](https://travis-ci.org/dakatsuka/node-consistent-hashing.svg)](https://travis-ci.org/dakatsuka/node-consistent-hashing) [![npm version](https://badge.fury.io/js/consistent-hashing.svg)](https://badge.fury.io/js/consistent-hashing)

A pure JavaScript implementation of Consistent Hashing for Node.js.

## Installation

```
$ npm install consistent-hashing
```

## Usage

```javascript
var ConsistentHashing = require('consistent-hashing');
var cons = new ConsistentHashing(["node1", "node2", "node3"]);

var nodes = {};
var chars = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

chars.forEach(function(c) {
  var node = cons.getNode(c);

  if (nodes[node]) {
    nodes[node].push(c);
  } else {
    nodes[node] = [];
    nodes[node].push(c);
  }
});

console.log(nodes);

// { node3: [ 'A', 'F', 'H', 'J', 'N', 'S', 'U', 'W', 'X' ],
//   node1: [ 'B', 'C', 'E', 'G', 'L', 'M', 'Q', 'R', 'V', 'Y', 'Z' ],
//   node2: [ 'D', 'I', 'K', 'O', 'P', 'T' ] }
```

add nodes:

```javascript
cons.addNode("node4");
```

remove node:

```javascript
cons.removeNode("node1");
```

## Copyright

Copyright (C) 2011-2015 Dai Akatsuka, released under the MIT License.
