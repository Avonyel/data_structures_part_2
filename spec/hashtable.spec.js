const HashTable = require("../hashtable");
let testHash;

describe("HashTable", () => {
	beforeEach(() => {
		testHash = new HashTable(50, 50);
	});

	describe("hash", () => {
		it("should take a string input and output an index", () => {
			expect(testHash.hash("ab")).toEqual(16);
		});

		it("should return different numbers for same characters with different first and/or last character", () => {
			const a = testHash.hash("abc");
			const b = testHash.hash("cba");
			expect(a === b).toBe(false);
		});
	});

	describe();
});
