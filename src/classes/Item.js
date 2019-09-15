//Class to represent Items
class item {
	//constructor takes in two strings, a name and brand.
	constructor(name, brand) {
		//Generate random id
		this._id = '' + Math.random().toString(36).substr(2, 16);

		this.name = name;
		this.brand = brand;
		this.acquisitionDate = 'Not set';
		this.startDate = 'Not set';
		this.completionDate = 'Not set';
		this.expiryDate = 'Not set';
		this.count = 1;
	}

	setName = (input) => {
		this.name = input;
	};

	setBrand = (input) => {
		this.brand = input;
	};

	setDetails = (input) => {
		this.details = input;
	};

	setMainCategory = (input) => {
		this.mainCategory = input;
	};

	setSubCategory = (input) => {
		this.subCategory = input;
	};

	setSize = (input) => {
		this.size = input;
	};

	setVendor = (input) => {
		this.vendor = input;
	};

	setPrice = (input) => {
		this.price = input;
	};

	setAcquisitionDate = (date) => {
		this.acquisitionDate = date;
	};

	setStartDate = (date) => {
		this.startDate = date;
	};

	setCompletionDate = (date) => {
		this.completionDate = date;
	};

	setExpiryDate = (date) => {
		this.expiryDate = date;
	};

	setMaxUse = (input) => {
		this.maxUse = input;
	};

	setRepurchaseItem = (input) => {
		this.repurchaseItem = input;
	};

	setNote = (input) => {
		this.note = input;
	};

	setPhoto = (img) => {
		this.photo = img;
	};

	//incements the count
	add = () => {
		this.count++;
	};

	//decrements the count
	remove = () => {
		if (count > 1) {
			this.count--;
		}
	};

	printAcquisitionDate = () => {
		if (!this.acquisitionDate) {
			return 'Not set';
		} else {
			return this.acquisitionDate.toDateString();
		}
	};

	printStartDate = () => {
		if (!this.startDate) {
			return 'Not set';
		} else {
			return this.startDate.toDateString();
		}
	};

	printCompletionDate = () => {
		if (!this.completionDate) {
			return 'Not set';
		} else {
			return this.completionDate.toDateString();
		}
	};

	printExpiryDate = () => {
		if (!this.expiryDate) {
			return 'Not set';
		} else {
			return this.expiryDate.toDateString();
		}
	};
}

export default item;

/*this.setDetails = this.setDetails.bind(this);
		this.setMainCategory = this.setMainCategory.bind(this);
		this.setSubCategory = this.setSubCategory.bind(this);
		this.setSize = this.setSize.bind(this);
		this.setPrice = this.setPrice.bind(this);
		this.setAcquisitionDate = this.setAcquisitionDate.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setCompletionDate = this.setCompletionDate.bind(this);
		this.setExpiryDate = this.setExpiryDate.bind(this);
		this.setMaxUse = this.setMaxUse.bind(this);
		this.setRepurchaseItem = this.setRepurchaseItem.bind(this);
		this.setNote = this.setNote.bind(this);
		this.setPhoto = this.setPhoto.bind(this);
		this.add = this.add.bind(this);
		this.remove = this.remoove.bind(this);*/
