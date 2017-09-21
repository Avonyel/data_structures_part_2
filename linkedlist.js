class Node {
	constructor(data) {
		this.data = data;
		this.nextNode = null;
	}
}

class LinkedList {
	constructor(nodes) {
		if (!Array.isArray(nodes)) {
			throw new Error("You must pass in an array of Nodes");
		}

		this.head = nodes[0];
		this.tail = nodes[nodes.length - 1];

		for (let i = 0, len = nodes.length - 1; i < len; i++) {
			nodes[i].nextNode = nodes[i + 1];
		}
	}

	readNode(index) {
		let counter = 0;
		let currentHead = this.head;

		while (counter < index) {
			if (currentHead.nextNode === null) {
				return null;
			}

			currentHead = currentHead.nextNode;
			counter++;
		}

		return currentHead.data;
	}

	insert(data, index) {
		let node = new Node(data);

		if (index === 0) {
			node.nextNode = this.head;
			this.head = node;
			return;
		}

		let counter = 0;
		let currentHead = this.head;
		let previous = null;

		while (currentHead && counter < index - 1) {
			if (currentHead.nextNode === null) {
				return null;
			}
			previous = currentHead;
			currentHead = currentHead.nextNode;
			counter++;
		}

		previous = currentHead;
		const newNode = new Node(data);

		newNode.nextNode = previous.nextNode;
		previous.nextNode = newNode;
	}

	// should be O(n), ran it in place
	reverse() {
		let currentNode = this.head;
		this.tail = currentNode;
		let previousNode = null;
		let next = null;
		while (currentNode.nextNode) {
			next = currentNode.nextNode;
			currentNode.nextNode = previousNode;
			previousNode = currentNode;
			currentNode = next;
		}

		currentNode.nextNode = previousNode;
		this.head = currentNode;
	}
}

const node = new Node("hello");
const node1 = new Node("hello1");
const node2 = new Node("hello2");
const node3 = new Node("hello3");

const linkedList = new LinkedList([node, node1, node2, node3]);

console.log(linkedList.readNode(0));
console.log(linkedList.readNode(1));
console.log(linkedList.readNode(2));
console.log(linkedList.readNode(3));

linkedList.reverse();

console.log(linkedList.readNode(0));
console.log(linkedList.readNode(1));
console.log(linkedList.readNode(2));
console.log(linkedList.readNode(3));
