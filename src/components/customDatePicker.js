import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class customDatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date    : this.props.date && this.props.date !== 'Not Set' ? this.props.date : new Date(),
			show    : false,
			hasDate : this.props.date && this.props.date !== 'Not Set' ? true : false
		};
		console.log('prop date: ' + this.props.date);
	}

	onChange = (event, date) => {
		date = date || this.state.date;
		this.setState({ show: Platform.OS === 'ios' ? true : false, date, hasDate: true });
		this.props.onChange(date, this.props.stateName);
	};

	show = () => {
		this.setState({ show: true });
	};

	deleteDate = () => {
		this.setState({ date: new Date(), hasDate: false });
		this.props.onChange('Not Set', this.props.stateName);
	};

	render() {
		console.log("Date: " + this.state.date);
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.show}>
					<Text style={styles.text}>{this.state.hasDate ? this.state.date.toDateString() : 'Not Set'}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={this.state.hasDate ? styles.deleteButton : { display: 'none' }}
					onPress={this.deleteDate}
				>
					<Image source={require('../../images/icons8-cancel-24.png')} />
				</TouchableOpacity>
				{this.state.show && (
					<DateTimePicker value={this.state.date} onChange={(event, date) => this.onChange(event, date)} />
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container    : {
		padding       : 4,
		flexDirection : 'row'
	},
	text         : {
		fontSize : 18
	},
	deleteButton : {
		marginHorizontal : 4
	}
});
