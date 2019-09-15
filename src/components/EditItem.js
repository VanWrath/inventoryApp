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
	TouchableOpacity,
	Switch
} from 'react-native';
import Item from '../classes/Item';
import ImagePicker from './ImagePicker';
import DatePicker from './DatePicker';

//Component renders screen to take in user input to create a new item record.
export default class EditItem extends Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.collection = navigation.getParam('list');
		this.item = navigation.getParam('item');
		this.state = {
			_id            : this.item._id,
			name           : this.item.name,
			brand          : this.item.brand,
			details        : this.item.details,
			mainCategory   : this.item.mainCategory,
			subCategory    : this.item.subCategory,
			size           : this.item.size,
			vendor         : this.item.vendor,
			price          : this.item.price,
			maxUse         : this.item.maxUse,
			repurchaseItem : this.item.repurchaseItem,
			notes          : this.item.notes,
			photo          : this.item.photo,
			amount         : this.item.count,
			//itemIndex      : this.props.navigation.getParam('itemIndex'),
			listIndex      : this.props.navigation.getParam('listIndex')
		};

		this.state.acquisitionDate =
			this.item.acquisitionDate == 'Not Set' ? null : new Date(this.item.acquisitionDate);
		this.state.startDate = this.item.startDate == 'Not Set' ? null : new Date(this.item.startDate);
		this.state.completionDate = this.item.completionDate == 'Not Set' ? null : new Date(this.item.completionDate);
		this.state.expiryDate = this.item.expiryDate == 'Not Set' ? null : new Date(this.item.expiryDate);
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title : 'Edit'
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
		//console.log('brand in edit: ' + this.state.brand);
	};

	//updates item
	submit = () => {
		if (this.state.name.length > 0 && this.state.brand.length > 0) {
			var updateItem = new Item(this.state.name, this.state.brand);
			updateItem.setDetails(this.state.details);
			updateItem.setMainCategory(this.state.mainCategory);
			updateItem.setSubCategory(this.state.subCategory);
			updateItem.setSize(this.state.size);
			updateItem.setVendor(this.state.vendor);
			updateItem.setPrice(this.state.price);
			updateItem.setNote(this.state.notes);
			if (this.state.acquisitionDate !== null) {
				updateItem.setAcquisitionDate(this.state.acquisitionDate.toDateString());
			} else {
				updateItem.setAcquisitionDate('Not Set');
			}
			if (this.state.startDate !== null) {
				updateItem.setStartDate(this.state.startDate.toDateString());
			} else {
				updateItem.setStartDate('Not Set');
			}
			if (this.state.completionDate !== null) {
				updateItem.setCompletionDate(this.state.completionDate.toDateString());
			} else {
				updateItem.setCompletionDate('Not Set');
			}
			if (this.state.expiryDate !== null) {
				updateItem.setExpiryDate(this.state.expiryDate.toDateString());
			} else {
				updateItem.setExpiryDate('Not Set');
			}
			updateItem.setMaxUse(this.state.maxUse);
			updateItem.setRepurchaseItem(this.state.repurchaseItem);
			updateItem.setPhoto(this.state.photo);
			if (this.state.repurchaseItem && this.state.expiryDate != null) {
				this.setNotification();
			}
			this.props.screenProps.updateItem(updateItem, this.state.listIndex, this.state._id);
			this.props.navigation.goBack();
		} else {
			alert('Please enter product name and brand.');
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<ImagePicker onChangePhoto={this.setPhoto} value={this.state.photo} />

					<View style={styles.section}>
						<Text style={styles.label}>Name:</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Enter name"
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
							placeholder="Enter brand"
							onChangeText={(brand) => this.setState({ brand })}
							value={this.state.brand}
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
							placeholder="Enter details"
							onChangeText={(details) => this.setState({ details })}
							value={this.state.details}
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
							value={this.state.mainCategory}
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
							value={this.state.subCategory}
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
							value={this.state.size}
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
							value={this.state.vendor}
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
							value={this.state.price.toString()}
							returnKeyType="next"
							keyboardType="numeric"
						/>
					</View>

					<Text style={styles.label}>Aquisition Date: </Text>
					<DatePicker
						date={this.state.acquisitionDate}
						dateProp={'acquisitionDate'}
						setFunction={this.setDate}
					/>

					<Text style={styles.label}>Start Date: </Text>
					<DatePicker date={this.state.startDate} dateProp={'startDate'} setFunction={this.setDate} />

					<Text style={styles.label}>Completion Date: </Text>
					<DatePicker
						date={this.state.completionDate}
						dateProp={'completionDate'}
						setFunction={this.setDate}
					/>

					<Text style={styles.label}>Expiry Date: </Text>
					<DatePicker date={this.state.expiryDate} dateProp={'expiryDate'} setFunction={this.setDate} />

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
	container  : {
		flex            : 1,
		justifyContent  : 'space-between',
		alignItems      : 'stretch',
		backgroundColor : '#F5FCFF',
		margin          : 10
	},
	label      : {
		fontSize   : 17,
		fontWeight : 'bold',
		//width      : 200,
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
