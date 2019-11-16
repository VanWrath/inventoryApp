import React, { Component } from 'react';
import {
	DatePickerIOS,
	DatePickerAndroid,
	Image,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	View
} from 'react-native';
//import { View } from 'react-native-animatable';

//Date picker component for both android and ios to select dates as user input.
export default class DatePicker extends Component {
	constructor(props) {
		super(props);
		let PropDate = this.props.date;
		this.hasDate = PropDate == null ? false : true;
		//console.log('hasDate: ' + this.hasDate);
		this.state = {
			date              : this.hasDate ? PropDate : new Date(),
			datePickerVisible : false
		};
		this.datePickerAndroid = this.datePickerAndroid.bind(this);
		//console.log('hasDate: ' + this.state.hasDate);
	}

	changeDate = (date) => {
		this.props.setFunction(this.props.dateProp, date);
	};

	onChangeDateIOS = (newDate) => {
		this.setState({date : newDate});
		this.changeDate(newDate);
	}

	async datePickerAndroid() {
		try {
			//var today = new Date();
			const { action, year, month, day } = await DatePickerAndroid.open({
				date : this.hasDate ? this.state.date : new Date(),
				mode : 'default'
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				this.setState({
					date : new Date(year, month, day)
				});
				this.hasDate = true;
				this.changeDate(this.state.date);
			}
		} catch ({ code, message }) {
			console.warn('Date picker error: ', message);
		}
	}

	removeDate = () => {
		this.hasDate = false;
		this.setState({ date: null });
		this.changeDate(null);
	};

	toggleDatePicker = () => {
		this.setState({ datePickerVisible: !this.state.datePickerVisible });
	};

	render() {
		return Platform.select({
			ios     : (
				<TouchableOpacity onPress={this.toggleDatePicker}>
					<Text>{this.state.date.toDateString()}</Text>
					<View style={[ this.state.datePickerVisible ? { display: 'flex' } : { display: 'none' } ]}>
						<DatePickerIOS date={this.state.date} onDateChange={this.onChangeDateIOS} mode={'date'} />
					</View>
				</TouchableOpacity>
			),
			android : (
				<View style={styles.view}>
					<TouchableOpacity onPress={this.datePickerAndroid}>
						<Text style={[ this.hasDate ? { display: 'flex' } : { display: 'none' } ]}>
							{this.hasDate ? this.state.date.toDateString() : 'Not Set'}
						</Text>
						<Text style={[ this.hasDate ? { display: 'none' } : { display: 'flex' } ]}>Not Set</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.removeDate}>
						<Image
							source={require('../../images/icons8-cancel-24.png')}
							style={[ this.hasDate ? styles.xButton : { display: 'none' } ]}
						/>
					</TouchableOpacity>
				</View>
			)
		});
	}
}

//styles for the component
const styles = StyleSheet.create({
	touchable : {
		padding : 5
	},
	xButton   : {
		height           : 20,
		width            : 20,
		marginHorizontal : 20
	},
	view      : {
		flexDirection : 'row',
		//padding       : 5,
		margin        : 10
	}
});
