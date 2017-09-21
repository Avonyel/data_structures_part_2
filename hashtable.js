const LinkedList = require("./linkedlist");
const dictionary = require("./dictionary.json");

class HashTable {
  constructor(length) {
    this.buckets = new Array(length);
  }

  hash(input) {
    //assume input is a string
    //take char code at first
    let first = input.charCodeAt(0);
    if (first > 90) first -= 32;
    return (first -= 65);

    //check if in buckets, else add
  }

  insert(word, definition) {
    const index = this.hash(word);
    word = word.toLowerCase();

    if (this.buckets[index]) {
      this.buckets[index].append([word, definition]);
    } else {
      this.buckets[index] = new LinkedList([[word, definition]]);
    }
  }

  renderList() {
    let counter = 0;

    for (let i = 0; i < 26; i++) {
      counter = 0;
      if (this.buckets[i]) {
        let node = this.buckets[i].readNode(counter);
        console.log(node.data);
        while (node.nextNode) {
          counter++;
          node = this.buckets[i].readNode(counter);
          console.log(node.data);
        }
      }
    }
  }

  define(word) {
    word = word.toLowerCase();
    let counter = 0;
    let index = this.hash(word);
    if (!this.buckets[index]) return console.log("not found :)");
    let node;
    do {
      node = this.buckets[index].readNode(counter);
      if (node.data[0] === word)
        return console.log(node.data[1], "\nNodes traversed: ", counter + 1);
      counter++;
    } while (node.nextNode);
    console.log("not found :)");
    console.log("Nodes traversed: ", counter + 1);
  }
}

const testHash = new HashTable(26);

// testHash.insert("Dalphabet", "an alphabet starting with D");
//
// testHash.insert(
//   "Xyzygy",
//   "I don't know what this means but I'm pretty sure it's a word"
// );
// testHash.insert("alphabet", "an alphabet");
// testHash.insert("recursion", "see recursion");
// testHash.insert("aaaaaa", "a sarcastic scream");

Object.entries(dictionary).forEach(entry => {
  testHash.insert(entry[0], entry[1]);
});

testHash.define("CAT");
