import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import Collection from '../classes/Collection';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-community/async-storage';

import { loadData } from '../reducers/reducer';
import { connect } from 'react-redux';

//First Component the user sees. Displays the collecitons the user has made.
class Home extends Component {
	componentDidMount() {
		this.getData();
	}
	//sets up navigation options for current screen
	static navigationOptions = {
		headerTitle : 'Inventory'
		/*headerRight : (
			<TouchableOpacity style={{ padding: 10 }} onPress={() => alert('Settings!')}>
				<Image source={require('../../images/icons8-menu-vertical-24.png')} />
			</TouchableOpacity>
		)*/
	};

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

	keyExtractor = (item, index) => item._id;

	//function to navigate to go to add new collection screen
	goToNewColl = () => {
		this.props.navigation.navigate('NewCollection', {
			addList : this.props.screenProps.addList
		});
	};

	/*	funciton to navigate to List screen
	*	@param item is a Collection object
	*/
	goToList = (item, index) => {
		console.log('item id:' + item._id);
		this.props.navigation.navigate('List', {
			collection : item,
			id         : item._id
		});
	};

	//function to pass in parameters from element to create a new component to render
	renderItem = ({ item, index }) => <ListItem data={item} index={index} text={item.name} onPress={this.goToList} />;

	render() {
		const { lists } = this.props;
		console.log('Rendering Home: ' + JSON.stringify(this.props.lists));
		console.log('--------------------------------------');
		return (
			<View style={styles.container}>
				<FlatList
					data={lists}
					extraData={this.props}
					keyExtractor={this.keyExtractor}
					renderItem={({ item, index }) => this.renderItem({ item, index })}
				/>
				<Button onPress={this.goToNewColl} title="Add New Collection" /*color="#33cc33"*/ />
			</View>
		);
	}
}

//styles for the component
const styles = StyleSheet.create({
	container : {
		flex            : 1,
		justifyContent  : 'space-evenly',
		alignItems      : 'stretch',
		backgroundColor : '#eee',
		padding         : 5
	},
	newItem   : {
		alignItems      : 'center',
		backgroundColor : '#46d246',
		margin          : 5,
		padding         : 20
	}
});

//maps store state to props
const mapStateToProps = (state) => {
	let storedCollections = state.lists.map((list) => ({ key: list._id, ...list }));
	return {
		lists : storedCollections
	};
};

//maps dispatch functions to props
const mapDispatchToProps = {
	loadData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
