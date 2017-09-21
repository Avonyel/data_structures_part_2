const LinkedList = require("./linkedlist");
const dictionary = require("./dictionary.json");

class HashTable {
  constructor(tuning = 15, buckets = 20) {
    this.buckets = new Array(buckets);
    this.tuning = tuning;
    this.entries = 0;
    this.counters = {
      balance: 0,
      hash: 0,
      insert: 0,
      renderList: 0,
      define: 0
    };
  }

  tic(methodName) {
    return console.log(
      `${methodName} took ${this.counters[methodName]} operations`
    );
  }

  balance() {
    if (!(this.entries / this.buckets.length > this.tuning)) return;
    const currentBuckets = this.renderList();
    this.buckets = new Array(this.buckets.length * 2);

    currentBuckets.forEach(bucket => {
      this.insert(bucket[0], bucket[1]);
      this.counters.balance++;
    });

    this.tic("balance");
    this.counters.balance = 0;
  }

  hash(input) {
    this.counters.hash = 0;
    return (
      ((input.split("").reduce((sum, letter) => {
        return sum + letter.charCodeAt(0);
      }, 0) +
        input.charCodeAt(0)) *
        input.charCodeAt(input.length - 1)) %
      this.buckets.length
    );
    this.counters.hash++;
    this.tic("hash");
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
    this.counters.renderList = 0;
    let counter = 0;
    let giantArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      counter = 0;
      this.counters.renderList++;
      if (this.buckets[i]) {
        let node = this.buckets[i].readNode(counter);
        giantArray.push(node.data);
        while (node.nextNode) {
          this.counters.renderList++;
          counter++;
          node = this.buckets[i].readNode(counter);
          giantArray.push(node.data);
        }
      }
    }

    this.tic("renderList");
    return giantArray;
  }

  define(word) {
    this.counters.define = 0;
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
    this.counters.define = counter;
    this.tic("define");
  }
}

// const testHash = new HashTable(20, 50);

// Object.entries(dictionary).forEach(entry => {
//   testHash.insert(entry[0], entry[1]);
// });

// testHash.define("asdfadfhk");
// testHash.define("bsdfadfhk");
// testHash.define("csdfadfhk");
// testHash.define("dsdfadfhk");
// testHash.define("esdfadfhk");
// testHash.define("fsdfadfhk");
// testHash.define("gsdfadfhk");
// testHash.define("hsdfadfhk");
// testHash.define("inlsdkjf;alkj");

// testHash.insert("Dalphabet", "an alphabet starting with D");

// testHash.insert(
//   "Xyzygy",
//   "I don't know what this means but I'm pretty sure it's a word"
// );
// testHash.insert("alphabet", "an alphabet");
// testHash.insert("recursion", "see recursion");
// testHash.insert("aaaaaa", "a sarcastic scream");

// testHash.renderList();
// testHash.renderList();
// testHash.renderList();
// testHash.renderList();

module.exports = HashTable;
