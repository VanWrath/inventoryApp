import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import NotifService from '../services/NotifService';

export default class TestNotif extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//senderId : appConfig.senderID
			date     : new Date(2019, 5, 3),
			itemName : 'Test Name'
		};

		this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
	}

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

	render() {
		console.log('state: ' + JSON.stringify(this.state));
		return (
			<View style={styles.container}>
				<Text> Test Notifications </Text>
				<View style={styles.spacer} />
				<TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
				<View style={styles.spacer} />

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.notif.localNotif(this.state.itemName);
					}}
				>
					<Text>Local Notification (now)</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.notif.scheduleNotif(this.state.date, this.state.itemName);
					}}
				>
					<Text>Schedule Notification</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#f5fcff'
	},
	button    : {
		borderWidth     : 1,
		borderColor     : '#000000',
		margin          : 5,
		padding         : 5,
		width           : '70%',
		backgroundColor : '#DDDDDD',
		borderRadius    : 5
	},
	spacer    : {
		height : 10
	},
	textField : {
		borderWidth : 1,
		borderColor : '#AAAAAA',
		margin      : 5,
		padding     : 5,
		width       : '70%'
	}
});
