import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import Collection from '../classes/Collection';
import ListItem from './ListItem';

//Component to render each collection in the list of collections
/*class MyListItem extends React.Component {
	//calls the 'goToList' function and passes in selected collection
	onPress = () => {
		this.props.onPress(this.props.collection, this.props.index);
	};

	render() {
		//console.log('Name: ' + this.props.collection.name, 'id: ' + this.props.collection._id);
		return (
			<TouchableOpacity style={styles.listItem} onPress={this.onPress}>
				<Text style={styles.listtext}>{this.props.collection.name}</Text>
			</TouchableOpacity>
		);
	}
}*/

//First Component the user sees. Displays the collecitons the user has made.
export default class Home extends Component {
	//sets up navigation options for current screen
	static navigationOptions = {
		headerTitle : 'Inventory'
		/*headerRight : (
			<TouchableOpacity style={{ padding: 10 }} onPress={() => alert('Settings!')}>
				<Image source={require('../../images/icons8-menu-vertical-24.png')} />
			</TouchableOpacity>
		)*/
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
		this.props.navigation.navigate('List', {
			collection : item,
			index      : index
		});
	};

	//function to pass in parameters from element to create a new component to render
	renderItem = ({ item, index }) => <ListItem data={item} index={index} text={item.name} onPress={this.goToList} />;

	render() {
		// console.log('Rendering Home. props:' + JSON.stringify(this.props.screenProps.list));
		// console.log('--------------------------------------');
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.screenProps.list}
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
