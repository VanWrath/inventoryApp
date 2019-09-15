import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

/*Compenent to be rendered as a list item when using lists
* Props:
* onPress(): function to run when item is pressed
* item: data representing the item
* text: text to be displyed
* index: index of item from the list for maniopulating collections.
*/
export default class GridItem extends Component {
	constructor(props) {
		super(props);
	}

	onPress = () => {
		this.props.onPress(this.props.data, this.props.index);
	};

	render() {
		return (
			<TouchableOpacity
				style={[ this.props.showImage ? styles.listItemImg : styles.listItem ]}
				onPress={this.onPress}
			>
				<Image
					style={[ this.props.showImage ? styles.image : { display: 'none' } ]}
					source={this.props.image}
				/>
				<Text style={styles.listtext}>{this.props.text}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	listItem    : {
		alignItems      : 'center',
		justifyContent  : 'center',
		margin          : 1,
		padding         : 20,
		backgroundColor : '#DDDDDD', //'#39a9db'
		flexDirection   : 'row'
	},
	listItemImg : {
		//width           : width,
		alignItems      : 'center',
		margin          : 1,
		padding         : 1,
		backgroundColor : '#DDDDDD', //'#39a9db'
		flexDirection   : 'column'
		//height          : 100
	},
	listtext    : {
		fontSize   : 20,
		marginLeft : 5
		//color    : 'white'
	},
	image       : {
		width      : width / 4,
		height     : width / 4,
		resizeMode : 'contain'
	}
});
