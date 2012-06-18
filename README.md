# node-consistent-hashing [![Build Status](https://secure.travis-ci.org/dakatsuka/node-consistent-hashing.png?branch=master)][travis]

A pure JavaScript implementation of Consistent Hashing for Node.js.

[travis]: http://travis-ci.org/dakatsuka/node-consistent-hashing

## Installation

    npm install consistent-hashing

## Usage

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

add nodes:

    cons.addNode("node4");

remove node:

    cons.removeNode("node1");


## Copyright

Copyright (C) 2011 Dai Akatsuka, released under the MIT License.
