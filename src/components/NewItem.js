/*Component used for the add new item screen
*/
import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	ScrollView,
	DatePickerIOS,
	DatePickerAndroid,
	TouchableOpacity,
	Switch
} from 'react-native';
import Item from '../classes/Item';
import ImagePicker from './ImagePicker';
import DatePicker from './DatePicker';

const defaultImage = require('../../images/default.jpg');

//Component renders screen to take in user input to create a new item record.
export default class NewItem extends Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.collection = navigation.getParam('collection', '');
		this.state = {
			name            : '',
			brand           : '',
			details         : '',
			mainCategory    : '',
			subCategory     : '',
			size            : '',
			vendor          : '',
			price           : 0.0,
			acquisitionDate : null,
			startDate       : null,
			completionDate  : null,
			expiryDate      : null,
			maxUse          : 0,
			repurchaseItem  : false,
			notes           : '',
			photo           : defaultImage,
			listIndex       : navigation.getParam('index')
		};
	}
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title : 'New Item'
		};
	};

	setPhoto = (src) => {
		this.setState({ photo: src });
	};

	//changes the date of the specified state
	setDate = (dateProp, date) => {
		this.setState({ [dateProp]: date });
	};

	setNotification = () => {
		var notifDate;
		if (this.state.completionDate > Date.now() && this.state.completionDate < this.state.expiryDate) {
			notifDate = this.state.completionDate;
		} else {
			notifDate = this.state.expiryDate;
		}
		this.props.screenProps.scheduleNotif(notifDate, this.state.name, this.state.brand);
	};

	//creates new item object and adds it to list
	submit = () => {
		if (this.state.name.length > 0 && this.state.brand.length > 0) {
			var newItem = new Item(this.state.name, this.state.brand);
			newItem.setDetails(this.state.details);
			newItem.setMainCategory(this.state.mainCategory);
			newItem.setSubCategory(this.state.subCategory);
			newItem.setSize(this.state.size);
			newItem.setVendor(this.state.vendor);
			newItem.setPrice(this.state.price);
			newItem.setNote(this.state.notes);
			if (this.state.acquisitionDate !== null) {
				newItem.setAcquisitionDate(this.state.acquisitionDate.toDateString());
			} else {
				newItem.setAcquisitionDate('Not Set');
			}
			if (this.state.startDate !== null) {
				newItem.setStartDate(this.state.startDate.toDateString());
			} else {
				newItem.setStartDate('Not Set');
			}
			if (this.state.completionDate !== null) {
				newItem.setCompletionDate(this.state.completionDate.toDateString());
			} else {
				newItem.setCompletionDate('Not Set');
			}
			if (this.state.expiryDate !== null) {
				newItem.setExpiryDate(this.state.expiryDate.toDateString());
			} else {
				newItem.setExpiryDate('Not Set');
			}
			newItem.setMaxUse(this.state.maxUse);
			newItem.setRepurchaseItem(this.state.repurchaseItem);
			newItem.setPhoto(this.state.photo);
			if (this.state.repurchaseItem) {
				this.setNotification();
			}
			this.props.screenProps.addToList(newItem, this.state.listIndex);
			console.log('Submit: item added.');
			this.props.navigation.goBack();
		} else {
			alert('Please enter product name and brand.');
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<ImagePicker onChangePhoto={this.setPhoto} />

					<View style={styles.section}>
						<Text style={styles.label}>Name:</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Enter Name"
							onChangeText={(name) => this.setState({ name })}
							value={this.state.name}
							returnKeyType="next"
							onSubmitEditing={(input) => {
								this.brandTextInput.focus();
							}}
							blurOnSubmit={false}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Brand: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.brandTextInput = input;
							}}
							placeholder="Enter Brand"
							onChangeText={(brand) => this.setState({ brand })}
							returnKeyType="next"
							onSubmitEditing={(input) => {
								this.detailsTextInput.focus();
							}}
							blurOnSubmit={false}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Details: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.detailsTextInput = input;
							}}
							placeholder="Enter Details"
							onChangeText={(details) => this.setState({ details })}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.mainCategoryTextInput.focus();
							}}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Main Category: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.mainCategoryTextInput = input;
							}}
							placeholder="Enter Main category"
							onChangeText={(mainCategory) => this.setState({ mainCategory })}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.subCategoryTextInput.focus();
							}}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Sub Category: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.subCategoryTextInput = input;
							}}
							placeholder="Enter Sub category"
							onChangeText={(subCategory) => this.setState({ subCategory })}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.sizeTextInput.focus();
							}}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Size: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.sizeTextInput = input;
							}}
							placeholder="Enter Size"
							onChangeText={(size) => this.setState({ size })}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.vendorTextInput.focus();
							}}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Vendor: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.vendorTextInput = input;
							}}
							placeholder="Enter Vendor"
							onChangeText={(vendor) => this.setState({ vendor })}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.priceTextInput.focus();
							}}
						/>
					</View>

					<View style={styles.section}>
						<Text style={styles.label}>Price: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.priceTextInput = input;
							}}
							placeholder="Enter Price"
							onChangeText={(price) => this.setState({ price })}
							returnKeyType="next"
							keyboardType="numeric"
						/>
					</View>

					<Text style={styles.label}>Aquisition Date: </Text>
					<DatePicker dateProp={'acquisitionDate'} setFunction={this.setDate} />

					<Text style={styles.label}>Start Date: </Text>
					<DatePicker dateProp={'startDate'} setFunction={this.setDate} />

					<Text style={styles.label}>Completion Date: </Text>
					<DatePicker dateProp={'completionDate'} setFunction={this.setDate} />

					<Text style={styles.label}>Expiry Date: </Text>
					<DatePicker dateProp={'expiryDate'} setFunction={this.setDate} />

					<View style={styles.section}>
						<Text style={styles.label}>Max Use: </Text>
						<TextInput
							style={styles.textBox}
							ref={(input) => {
								this.sizeTextInput = input;
							}}
							placeholder="Enter Number"
							onChangeText={(size) => this.setState({ size })}
							blurOnSubmit={false}
							onSubmitEditing={(input) => {
								this.vendorTextInput.focus();
							}}
							keyboardType="numeric"
						/>
					</View>

					<View style={styles.switchView}>
						<Text style={styles.label}>Repurchase item</Text>

						<Switch
							style={{ width: 50, end: 0 }}
							onValueChange={(value) => {
								this.props.screenProps.firstTimeRepurchase();
								this.setState({ repurchaseItem: value });
							}}
							value={this.state.repurchaseItem}
						/>
					</View>

					<Text style={styles.label}>Notes: </Text>
					<TextInput
						style={styles.textBox}
						ref={(input) => {
							this.notesTextInput = input;
						}}
						placeholder="Enter Extra Notes"
						onChangeText={(notes) => this.setState({ notes })}
					/>
				</ScrollView>

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
	container  : {
		flex            : 1,
		justifyContent  : 'space-between',
		alignItems      : 'stretch',
		backgroundColor : '#ffffff',
		margin          : 10
	},
	label      : {
		fontSize   : 17,
		fontWeight : 'bold',
		//width      : '35%',
		margin     : 5
	},
	listItem   : {
		margin          : 5,
		padding         : 20,
		backgroundColor : '#cccccc'
	},
	touchable  : {
		padding : 10,
		margin  : 10
	},
	section    : {
		//backgroundColor : '#F5FCFF',
		flexDirection : 'row'
	},
	switchView : {
		flexDirection  : 'row',
		justifyContent : 'space-between'
	},
	textBox    : {
		height : 40,
		//margin : 5,
		width  : '70%'
	}
});
