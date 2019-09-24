import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import Colleciton from '../classes/Collection';
import { addList } from '../reducers/reducer';
import { connect } from 'react-redux';
import Collection from '../classes/Collection';

//Component renders screen to take in user input to create a new collection.
class NewCollection extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	//sets up navigation options for current screen
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title : 'New Collection'
		};
	};

	//function adds new item to current list and navigates back to previous screen.
	submit = () => {
		if (this.state.text.length > 0) {
			//this.props.screenProps.addList(this.state.text);
			let newList = new Collection(this.state.text);
			this.props.addList(newList);
			//save data to storage
			this.props.navigation.goBack();
		} else {
			Alert.alert('Warning', 'Enter a name for your new collection', [
				{ text: 'Ok', onPress: () => console.log('Ok Pressed') }
			]);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>Collection Name: </Text>
					<TextInput
						style={{ height: 50 }}
						placeholder="Enter Colleciton Name"
						onChangeText={(text) => this.setState({ text })}
					/>
				</View>

				<Button
					title="Add"
					onPress={this.submit}
					//color="#33cc33"
				/>
			</View>
		);
	}
}

//styles for the component
const styles = StyleSheet.create({
	container : {
		flex            : 1,
		justifyContent  : 'space-between',
		alignItems      : 'stretch',
		backgroundColor : '#F5FCFF',
		padding         : 10
	},
	text      : {
		fontSize : 20,
		margin   : 10
	},
	listItem  : {
		margin          : 5,
		padding         : 20,
		backgroundColor : '#cccccc'
	}
});

//const mapStateToProps = (state) => {};

//maps dispatch functions to props
const mapDispatchToProps = {
	addList
};

export default connect(null, mapDispatchToProps)(NewCollection);
