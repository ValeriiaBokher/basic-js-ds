const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this._root = null;
	}

	root() {
		return this._root;
	}

	add(data) {
		const node = new Node(data);
		if (this._root === null) {
			this._root = node;
		} else {
			let current = this._root;
			while (true) {
				if (data < current.data) {
					if (current.left === null) {
						current.left = node;
						break;
					} else {
						current = current.left;
					}
				} else if (data > current.data) {
					if (current.right === null) {
						current.right = node;
						break;
					} else {
						current = current.right;
					}
				} else {
					break;
				}
			}
		}
	}

	has(data) {
		let current = this._root;
		while (current !== null) {
			if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			} else {
				return true;
			}
		}
		return false;
	}

	find(data) {
		let current = this._root;
		while (current !== null) {
			if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			} else {
				return current;
			}
		}
		return null;
	}

	remove(data) {
		let current = this._root;
		let parent = null;
		let nodeToDelete = null;
		let child = null;

		while (current !== null && nodeToDelete === null) {
			if (data < current.data) {
				parent = current;
				current = current.left;
			} else if (data > current.data) {
				parent = current;
				current = current.right;
			} else {
				nodeToDelete = current;
			}
		}

		if (nodeToDelete !== null) {
			if (nodeToDelete.left === null || nodeToDelete.right === null) {
				if (nodeToDelete.left === null) {
					child = nodeToDelete.right;
				} else {
					child = nodeToDelete.left;
				}

				if (parent === null) {
					this._root = child;
				} else if (parent.left === nodeToDelete) {
					parent.left = child;
				} else {
					parent.right = child;
				}
			} else {
				let rightMost = nodeToDelete.left;
				let rightMostParent = nodeToDelete;

				while (rightMost.right !== null) {
					rightMostParent = rightMost;
					rightMost = rightMost.right;
				}

				nodeToDelete.data = rightMost.data;

				if (rightMostParent.right === rightMost) {
					rightMostParent.right = rightMost.left;
				} else {
					rightMostParent.left = rightMost.left;
				}
			}
		}
	}

	min() {
		if (this._root === null) {
			return null;
		}

		let current = this._root;
		while (current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	max() {
		if (this._root === null) {
			return null;
		}

		let current = this._root;
		while (current.right !== null) {
			current = current.right;
		}
		return current.data;
	}
}

module.exports = {
	BinarySearchTree,
};
