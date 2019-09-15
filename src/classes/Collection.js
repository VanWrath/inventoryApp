import Item from './Item';

//Class to represent a list or Collection of items/products
class Collection {
	constructor(name) {
		//generate random id
		this._id = '' + Math.random().toString(36).substr(2, 16);
		this.name = name;
		this.items = [];

		this.setName = this.setName.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	setName = (name) => {
		this.name = name;
	};
	//creates a new item object and adds it to the list array
	addItem = (item) => {
		//let item = new Item(name);
		this.items.push(item);
	};

	//removes item from list array
	deleteItem = (itemName) => {
		for (let i = 0; i < this.items.length; i++) {
			if (itemName == this.items[i].name) {
				this.items.splice(i, 1);
			}
		}
	};
}

export default Collection;
