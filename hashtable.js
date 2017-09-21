const LinkedList = require("./linkedlist");

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

    if (this.buckets[index]) {
      this.buckets[index].append([word, definition]);
    } else {
      this.buckets[index] = new LinkedList([[word, definition]]);
    }
  }

  renderList() {
    let counter = 0;

    for (let i = 0; i < 26; i++) {
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

  define() {}
}

const testHash = new HashTable(26);

testHash.insert("Dalphabet", "an alphabet starting with D");

testHash.insert(
  "Xyzygy",
  "I don't know what this means but I'm pretty sure it's a word"
);
testHash.insert("alphabet", "an alphabet");
testHash.insert("recursion", "see recursion");
testHash.insert("aaaaaa", "a sarcastic scream");

testHash.renderList();
