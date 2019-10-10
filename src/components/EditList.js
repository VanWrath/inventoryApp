import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

//Component renders screen to take in user input to create a new collection.
export default class EditList extends Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.collection = navigation.getParam('list');
		this.state = {
			text  : this.collection.name,
			index : navigation.getParam('index')
		};
	}

	//sets up navigation options for current screen
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title : 'Edit'
		};
	};

	//function adds new item to current list and navigates back to previous screen.
	submit = () => {
		if (this.state.text.length > 0) {
			this.props.screenProps.updateList(this.state.index, this.state.text);
			//this.props.screenProps.update();
			this.props.navigation.goBack();
		} else {
			Alert.alert('Warning', 'Enter a name for your collection', [
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
						value={this.state.text}
					/>
				</View>

				<Button 
				title="Update" 
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
		backgroundColor : '#ffffff',
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
