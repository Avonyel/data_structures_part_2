const LinkedList = require("./linkedlist");
const dictionary = require("./dictionary.json");

class HashTable {
  constructor(tuning = 50, buckets = 50) {
    this.buckets = new Array(buckets);
    this.tuning = tuning;
    this.entries = 0;
  }

  balance() {
    if (!(this.entries / this.buckets.length > this.tuning)) return;
    const currentBuckets = this.renderList();
    this.buckets = new Array(this.buckets.length * 2);

    currentBuckets.forEach(bucket => {
      this.insert(bucket[0], bucket[1]);
    });

    console.log("Balancing: ", this.buckets.length, " buckets");
  }

  hash(input) {
    return (
      input.split("").reduce((sum, letter) => {
        return sum + letter.charCodeAt(0) - 64;
      }, 0) % this.buckets.length
    );
  }

  insert(word, definition) {
    if (typeof word[0] !== "string") return console.log("strings only");
    word = word.toLowerCase();

    const index = this.hash(word);

    if (this.buckets[index]) {
      this.buckets[index].append([word, definition]);
    } else {
      this.buckets[index] = new LinkedList([[word, definition]]);
    }
    this.entries++;
    this.balance();
  }

  renderList() {
    let counter = 0;
    let giantArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      counter = 0;
      if (this.buckets[i]) {
        let node = this.buckets[i].readNode(counter);
        giantArray.push(node.data);
        while (node.nextNode) {
          counter++;
          node = this.buckets[i].readNode(counter);
          giantArray.push(node.data);
        }
      }
    }

    return giantArray;
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

const testHash = new HashTable();

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
testHash.define("test");
testHash.define("inlsdkjf;alkj");
