import React, { Component } from 'react';
import { FlatList, Picker, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Item from '../classes/Item';
import FilterBox from '../components/FilterBox';

export default class TestList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			array      : [],
			filterType : 'mainCategory'
		};
		this.filterInput = '';
		var arr = [];
		var item1 = new Item('Final Fantasy XIII', 'Square-Enix');
		item1.setMainCategory('JRPG');
		var item2 = new Item('Kingdom Hearts I', 'Square-Enix');
		item2.setMainCategory('JRPG');
		var item3 = new Item('StarCraft II', 'Blizzard');
		item3.setMainCategory('Strategy');
		var item4 = new Item('Rome: Total War', 'Sega');
		item4.setMainCategory('Strategy');
		var item5 = new Item('Devil May Cry 5', 'Capcom');
		item5.setMainCategory('Action');
		var item6 = new Item("Assassin's Creed Odyssey", 'Ubisoft');
		item6.setMainCategory('Action');
		var item7 = new Item('God Of War', 'Sony');
		item7.setMainCategory('Action');
		var item8 = new Item('Star Ocean 4', 'Square-Enix');
		item8.setMainCategory('JRPG');
		arr.push(item1);
		arr.push(item2);
		arr.push(item3);
		arr.push(item4);
		arr.push(item5);
		arr.push(item6);
		arr.push(item7);
		arr.push(item8);

		this.state.array = arr;
	}

	componentDidMount() {
		this.setState({ outputList: this.state.array });
	}

	filterItems = (arr, filter) => {
		return arr.filter((el) => {
			return el[this.state.filterType].indexOf(filter) !== -1;
		});
	};

	filter = (input) => {
		this.filterInput = input;
		var { array } = this.state;
		var filterArr = this.filterItems(array, this.filterInput);
		if (this.filterInput.length > 0) {
			this.setState({ outputList: filterArr });
		} else {
			this.setState({ outputList: this.state.array });
		}
	};

	changeText = (input) => {
		this.setState({ filterInput: input });
	};

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity style={styles.listItem}>
				<Text style={styles.listtext}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		console.log('outputlist: ' + JSON.stringify(this.state.outputList));
		return (
			<View style={styles.container}>
				<View style={styles.filterContainer}>
					<Text style={styles.filterLabel}>Filter</Text>
					<Picker
						selectedValue={this.state.filterType}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => this.setState({ filterType: itemValue })}
					>
						<Picker.Item label="Brand" value="brand" />
						<Picker.Item label="Main Category" value="mainCategory" />
						<Picker.Item label="Subcategory" value="subCategory" />
						<Picker.Item label="Vendor" value="vendor" />
					</Picker>

					<TextInput
						style={styles.textField}
						onChangeText={(input) => {
							this.filter(input);
						}}
						value={this.state.filterInput}
					/>
				</View>

				<FlatList
					data={this.state.outputList}
					extraData={this.state}
					keyExtractor={(item, index) => item._id}
					renderItem={({ item }) => this.renderItem({ item })}
				/>
			</View>
		);
	}
}

//styles for the component
const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		justifyContent  : 'space-evenly',
		alignItems      : 'stretch',
		backgroundColor : '#F5FCFF',
		padding         : 5
	},
	listtext        : {
		fontSize : 20
	},
	filterLabel     : {
		alignItems : 'center',
		alignSelf  : 'center',
		fontSize   : 20,
		fontWeight : 'bold',
		width      : '20%',
		padding    : 10
	},
	listItem        : {
		alignItems      : 'center',
		margin          : 5,
		padding         : 20,
		backgroundColor : '#DDDDDD'
	},
	picker          : {
		height          : 40,
		alignSelf       : 'center',
		borderWidth     : 1,
		borderColor     : 'black',
		width           : '90%',
		backgroundColor : '#F5FCFF'
	},
	spacer          : {
		height : 10
	},
	textField       : {
		alignSelf       : 'center',
		borderWidth     : 1,
		borderColor     : '#AAAAAA',
		backgroundColor : '#F5FCFF',
		margin          : 5,
		padding         : 5,
		width           : '90%'
	},
	filterContainer : {
		backgroundColor : '#DDDDDD'
		//flexDirection   : 'row'
	}
});
