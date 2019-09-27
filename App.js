/*--------------------------------------------------------------------------------------
* Author: Kyle Vannarath
* Create Date: ‎April ‎6, ‎2019
* Description: Inventory app used to record information of items and make lists.
----------------------------------------------------------------------------------------*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import AppNavigator from './src/components/AppNavigator';
import { createAppContainer } from 'react-navigation';
import Collection from './src/classes/Collection';
import Item from './src/classes/Item';
import AsyncStorage from '@react-native-community/async-storage';
import NotifService from './src/services/NotifService';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
//middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './src/reducers/reducer';
import { loadData } from './src/reducers/reducer';

import TestNotif from './src/test/TestNotif';
import TestList from './src/test/TestList';

const instructions = Platform.select({
	ios     : 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android : 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

const AppContainer = createAppContainer(AppNavigator);
const middleware = [ thunk, logger ];
const store = createStore(reducers, applyMiddleware(...middleware));

export default class inventoryApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists        : [],
			store        : store,
			ftRepurchase : false
		};

		this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
	}

	componentWillMount() {
		/*console.log('Setting up state.');
		this.addList('Games');
		this.addList('Wine');
		this.addList('Makeup');
		this.addList('Technology');
		this.addList('Cars');
		this.addList('Kitchen');
		this.addList('Bathroom');
		this.addList('Clothes');
		let item = new Item('Kingdom Hearts HD I.5 Remix', 'Square-Enix');
		item.setDetails('PS3 game');
		item.setMainCategory('JRPG');
		item.setVendor('EB Games');
		item.setPrice(39.99);
		let acqireDate = new Date('September 10, 2014');
		item.setAcquisitionDate(acqireDate);
		let img = require('./images/KHI-5_cover.jpg');
		item.setPhoto(img);
		this.state.lists[0].addItem(item);

		this.storeData();
		this.state = {};
		console.log('cleared state');*/
		//this.getData();
	}

	//store data to make it persistent
	storeData = async (data) => {
		try {
			await AsyncStorage.setItem('data', JSON.stringify(data));
		} catch (e) {
			console.error(e);
		}
	};

	//retrieve persistent data
	getData = async () => {
		try {
			const value = await AsyncStorage.getItem('data');
			if (value && value.length) {
				//console.log('Loading data:' + value);
				//dispatch call instead for redux
				let initialStore = JSON.parse(value);
				this.props.loadData(initialStore);
				//this.setState({ lists: JSON.parse(value) });
			}
		} catch (e) {
			console.error(e);
		}
	};

	//adds new List object
	addList = (name) => {
		var { lists } = this.state;
		var collection = new Collection(name);
		lists.push(collection);
		this.setState({ lists });
		this.storeData();
	};

	//add item to specified list.
	addToList = (item, listIndex) => {
		var { lists } = this.state;
		//lists[listIndex].addItem(item);
		lists[listIndex].items.push(item);
		this.setState({ lists });
		this.storeData();
	};

	//deletes list from collections
	deleteList = (listIndex) => {
		var { lists } = this.state;
		lists.splice(listIndex, 1);
		this.setState({ lists });
		this.storeData();
	};

	//deletes item from specified list
	deleteItem = (listIndex, itemID) => {
		var { lists } = this.state;
		for (let i = 0; i < lists[listIndex].items.length; i++) {
			if (lists[listIndex].items[i]._id == itemID) {
				lists[listIndex].items.splice(i, 1);
			}
		}
		this.setState({ lists });
		this.storeData();
	};

	//updates an item in specified list
	updateItem = (item, listIndex, itemID) => {
		var { lists } = this.state;
		for (let i = 0; i < lists[listIndex].items.length; i++) {
			if (lists[listIndex].items[i]._id == itemID) {
				lists[listIndex].items[i] = item;
			}
		}
		this.setState({ lists });
		//console.log('updating item...');
		//console.log(this.state.lists);
		//console.log('--------------------------');
		this.storeData();
	};

	//updates a list
	updateList = (index, listName) => {
		var { lists } = this.state;
		lists[index].name = listName;
		this.setState({ lists });
		this.storeData();
	};

	firstTimeRepurchase = () => {
		if (!this.state.ftRepurchase) {
			this.setState({ ftRepurchase: true });
			Alert.alert(
				'Heads up!',
				'Setting repurchase to true will set a notification reminder to repurchase the item when the expiration date is near.',
				[ { text: 'OK', onPress: () => console.log('OK Pressed') } ]
			);
			this.storeData();
		}
	};

	/*Notifications*/
	onRegister(token) {
		Alert.alert('Registered !', JSON.stringify(token));
		console.log(token);
		this.setState({ registerToken: token.token, gcmRegistered: true });
	}

	onNotif(notif) {
		console.log(notif);
		Alert.alert(notif.title, notif.message);
	}

	handlePerm(perms) {
		Alert.alert('Permissions', JSON.stringify(perms));
	}

	scheduleNotif = (date, itemName, itemBrand) => {
		this.notif.scheduleNotif(date, itemName, itemBrand);
	};
	/*Notifications End */

	render() {
		//console.log('state:' + JSON.stringify(this.state));
		return (
			<Provider store={store}>
				<AppContainer
					screenProps={{
						list                : this.state.lists,
						addList             : this.addList,
						addToList           : this.addToList,
						deleteList          : this.deleteList,
						deleteItem          : this.deleteItem,
						updateList          : this.updateList,
						updateItem          : this.updateItem,
						scheduleNotif       : this.scheduleNotif,
						firstTimeRepurchase : this.firstTimeRepurchase
					}}
				/>
			</Provider>
		);
	}
}

/*

*/
