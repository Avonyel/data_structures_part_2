class Node {
	constructor(data) {
		this.data = data;
		this.nextNode = null;
	}
}

class LinkedList {
	constructor(data) {
		if (!Array.isArray(data)) {
			throw new Error("You must pass in an array of Nodes");
		}

		this.head = new Node(data[0]);
		let previous = this.head;
		this.tail = this.head;
		let newNode;

		if (data.length > 1) {
			for (let i = 1, len = data.length; i < len; i++) {
				newNode = new Node(data[i]);
				previous.nextNode = newNode;
				previous = newNode;
			}

			this.tail = newNode;
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

		return currentHead;
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

		if (!newNode.nextNode) this.tail = newNode;
	}

	append(data) {
		const newNode = new Node(data);
		this.tail.nextNode = newNode;
		this.tail = newNode;
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

// const linkedList = new LinkedList(["hello", "hello1", "hello2", "hello3"]);

// console.log(linkedList.readNode(0));
// console.log(linkedList.readNode(1));
// console.log(linkedList.readNode(2));
// console.log(linkedList.readNode(3));

// linkedList.insert("goodbye", 4);
// linkedList.reverse();

// console.log(linkedList.readNode(0));
// console.log(linkedList.readNode(1));
// console.log(linkedList.readNode(2));
// console.log(linkedList.readNode(3));
// console.log(linkedList.readNode(4));

// linkedList.append("wheeeee");
// linkedList.append("whatevs");

// console.log(linkedList.readNode(5));
// console.log(linkedList.readNode(6));

module.exports = LinkedList;
