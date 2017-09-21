const LinkedList = require("./linkedlist");

class HashTable {
  constructor(length) {
    this.buckets = new Array(length);
  }

  hash = input => {
    //assume input is a string
    //take char code at first
    let first = input.charCodeAt(0);
    if (first > 90) first -= 32;
    return (first -= 65);

    //check if in buckets, else add
  };

  insert = () => {};

  renderList = () => {};

  define = () => {};
}

const testHash = new HashTable(26);

console.log(testHash.hash("alphabet"));
