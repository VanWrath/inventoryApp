import React, { Component } from 'react';
import {
	Alert,
	Button,
	FlatList,
	Image,
	Picker,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import RNModal from 'react-native-modal';
import ListItem from './ListItem';
import GridItem from './GridItem';

//Component to display collection of items
export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list        : this.props.navigation.getParam('collection').items,
			showOptions : false,
			showFilter  : false,
			listIndex   : this.props.navigation.getParam('index'),
			filterType  : 'brand'
		};
		this.filterInput;
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title       : params ? params.collection.name : '',
			headerRight : (
				<View style={{ flexDirection: 'row' }}>
					{/*Sort Button
					<TouchableOpacity
						style={{
							color    : 'white',
							padding  : 10,
							fontSize : 20
						}}
						onPress={() => this.alphaSort()}
					>
						<Image source={require('../../images/icons8-alphabetical-sorting-24.png')} />
					</TouchableOpacity>
					*/}
					<TouchableOpacity
						style={{
							color    : 'white',
							padding  : 10,
							fontSize : 20
						}}
						onPress={navigation.getParam('toggleOptions')}
					>
						<Image source={require('../../images/icons8-menu-vertical-24.png')} />
					</TouchableOpacity>
				</View>
			)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ toggleOptions: this.toggleOptions });
		this.setState({ outputList: this.state.list });
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({ list: this.props.navigation.getParam('collection').items });
		}
		//console.log('update list data: ' + JSON.stringify(this.state.list));
	}

	alphaSort = () => {
		let sortList = this.state.outputList;
		sortList.sort(
			(compare = (a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (b.name > a.name) {
					return 1;
				}
				return 0;
			})
		);
		this.setState({ outputList: sortList });
		console.log('sorted');
		console.log(this.state.outputList);
	};

	//toggles the options menu
	toggleOptions = () => {
		this.setState({ showOptions: !this.state.showOptions });
	};

	toggleFilter = () => {
		this.setState({ showFilter: !this.state.showFilter });
	};

	keyExtractor = (item, index) => item._id;

	//function to pass in parameters from element to create a new component to render
	renderItem = ({ item, index }) => (
		/*
		<GridItem
			image={item.photo}
			text={item.name}
			showImage={true}
			data={item}
			index={index}
			onPress={this.goToDetails}
		/>
		*/
		<ListItem
			image={item.photo}
			text={item.name}
			showImage={true}
			data={item}
			index={index}
			onPress={this.goToDetails}
		/>
	);

	//function to navigate to add new item screen
	goToNewItem = (data) => {
		this.props.navigation.navigate('NewItem', {
			collection : data,
			index      : this.state.listIndex
		});
	};

	/*	function to navigate to details screen
	*	
	*/
	goToDetails = (item, index) => {
		this.props.navigation.navigate('Details', {
			data      : item,
			//itemIndex : index,
			listIndex : this.state.listIndex
		});
		console.log('rending details.');
	};

	//navigate to edit list page
	goToEdit = (data) => {
		this.toggleOptions();
		this.props.navigation.navigate('EditList', {
			list  : data,
			index : this.state.listIndex
		});
	};

	//delete list from collections
	delete = () => {
		this.toggleOptions();
		Alert.alert('Delete this list?', 'You will not be able to get this list back', [
			{ text: 'CANCEL', onPress: () => console.log('cancel pressed.') },
			{
				text    : 'DELETE',
				onPress : () => {
					this.props.screenProps.deleteList(this.state.listIndex);
					this.props.navigation.goBack();
				}
			}
		]);
	};

	filterItems = (arr, filter) => {
		return arr.filter((el) => {
			return el[this.state.filterType].indexOf(filter) !== -1;
		});
	};

	filter = (input) => {
		this.filterInput = input;
		var array = this.state.list;
		var filterArr = this.filterItems(array, this.filterInput);
		if (this.filterInput.length > 0) {
			this.setState({ outputList: filterArr });
		} else {
			this.setState({ outputList: this.state.list });
		}
	};

	render() {
		//const { navigation } = this.props;
		var collection = this.props.navigation.getParam('collection');
		//console.log('Rendering list. list:' + JSON.stringify(this.state.list));
		//console.log('--------------------------------------');
		// console.log('Rendering list. outputlist:' + JSON.stringify(this.state.outputList));
		// console.log('--------------------------------------');
		//console.log('List props: ' + JSON.stringify(collection));
		//console.log('--------------------------------------');
		this.setState({ outputList });

		return (
			<View style={styles.container}>
				{/*Filter Component */}
				<View style={styles.filterContainer}>
					<TouchableOpacity onPress={() => this.toggleFilter()}>
						<Text style={styles.filterLabel}>Filter</Text>
					</TouchableOpacity>
					<View style={[ this.state.showFilter ? { display: 'flex' } : { display: 'none' } ]}>
						<Picker
							selectedValue={this.state.filterType}
							style={styles.picker}
							itemStyle={styles.pickerItems}
							onValueChange={(itemValue, itemIndex) => {
								this.setState({ filterType: itemValue });
							}}
						>
							<Picker.Item label="Brand" value="brand" />
							<Picker.Item label="Main Category" value="mainCategory" />
							<Picker.Item label="Sub Category" value="subCategory" />
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
				</View>
				{/* Sort Button
				<Button
					onPress={() => {
						this.alphaSort();
					}}
					title="Sort"
				/>*/}

				{/*List of items*/}
				<FlatList
					data={this.state.outputList}
					extraData={this.props}
					keyExtractor={this.keyExtractor}
					renderItem={({ item, index }) => this.renderItem({ item, index })}
				/>
				<Button
					onPress={() => {
						this.goToNewItem(collection);
					}}
					title="Add New Item"
					//color="#33cc33"
				/>

				{/*Options menu*/}
				<RNModal
					isVisible={this.state.showOptions}
					backdropOpacity={0}
					onBackdropPress={() => {
						this.toggleOptions();
					}}
					onBackButtonPress={() => {
						this.toggleOptions();
					}}
					style={styles.moreOptions}
					animationIn="zoomInUp"
					animationOut="zoomOutDown"
				>
					<View>
						<TouchableOpacity
							onPress={() => {
								this.goToEdit(collection);
							}}
						>
							<Text style={styles.text}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.delete(collection.name);
							}}
						>
							<Text style={styles.text}>Delete</Text>
						</TouchableOpacity>
					</View>
				</RNModal>
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
		backgroundColor : '#eee',
		padding         : 5
	},
	listtext        : {
		fontSize : 20
	},
	listItem        : {
		alignItems      : 'center',
		margin          : 5,
		padding         : 20,
		backgroundColor : '#bbbbbb' //'#39a9db'
	},
	newItem         : {
		alignItems      : 'center',
		backgroundColor : '#46d246',
		margin          : 5,
		padding         : 20
	},
	newText         : {
		fontSize : 20,
		color    : 'white'
	},
	text            : {
		fontSize : 20,
		margin   : 10
	},
	moreOptions     : {
		width           : 100,
		marginTop       : 55,
		position        : 'absolute',
		backgroundColor : '#fff',
		alignSelf       : 'flex-end'
	},
	filterLabel     : {
		alignItems : 'center',
		alignSelf  : 'center',
		fontSize   : 20,
		fontWeight : 'bold',
		color      : 'black',
		width      : '20%',
		padding    : 10
	},
	picker          : {
		height          : 40,
		alignSelf       : 'center',
		width           : '90%',
		backgroundColor : '#eff'
	},
	textField       : {
		alignSelf       : 'center',
		borderWidth     : 1,
		borderColor     : '#777',
		borderRadius    : 15,
		backgroundColor : '#fff',
		padding         : 8,
		margin          : 5,
		width           : '90%'
	},
	filterContainer : {
		backgroundColor : '#fff', //'#40bcd8'
		marginBottom    : 10
		//flexDirection   : 'row'
	}
});
