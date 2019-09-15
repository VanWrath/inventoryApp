import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import RNModal from 'react-native-modal';

const { width } = Dimensions.get('window');

/*	Component that displays information on item recoords
* 	Props: 
*	data: item object to be displayed.
*	itemIndex: index of where the item is in its collection.
*	listIndex: index of which collection the item belongs to.
*/
export default class Details extends Component {
	constructor(props) {
		super(props);
		//const { navigation } = this.props;
		//const itemIndex = this.props.navigation.getParam('itemIndex');
		//const listIndex = this.props.navigation.getParam('listIndex');
		//Fix props update
		this.state = {
			showOptions : false,
			//itemIndex   : this.props.navigation.getParam('itemIndex'),
			listIndex   : this.props.navigation.getParam('listIndex'),
			data        : this.props.navigation.getParam('data')
		};
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title       : 'Details',
			headerRight : (
				<TouchableOpacity
					style={{
						color    : 'white',
						padding  : 10,
						fontSize : 20
					}}
					onPress={navigation.getParam('toggleOptions')}
				>
					<Image source={require('../../images/icons8-menu-vertical-24.png')} />
				</TouchableOpacity>
			)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ toggleOptions: this.toggleOptions });
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			console.log('this.props: ' + JSON.stringify(this.props.navigation));
			console.log('--------------------------');
			console.log('prevProps: ' + JSON.stringify(prevProps.navigation));
			console.log('--------------------------');
			//this.props.navigation.setParams({ data: this.props.navigate.getParam('data') });
			this.setState({ data: this.props.navigation.getParam('data') });
			//console.log('updating details data: ' + JSON.stringify(this.state.data));
		}
	}

	toggleOptions = () => {
		this.setState({ showOptions: !this.state.showOptions });
	};

	goToEditPage = (item) => {
		this.toggleOptions();
		this.props.navigation.navigate('EditItem', {
			item      : item,
			list      : this.list,
			//itemIndex : this.props.navigation.getParam('itemIndex'),
			listIndex : this.props.navigation.getParam('listIndex')
		});
	};

	delete = () => {
		this.toggleOptions();
		Alert.alert('Delete this item?', 'You will not be able to get this item back', [
			{ text: 'CANCEL', onPress: () => console.log('cancel pressed.') },
			{
				text    : 'DELETE',
				onPress : () => {
					console.log('delete listIndex: ' + this.state.listIndex);
					this.props.screenProps.deleteItem(this.state.listIndex, this.state.data._id);
					this.props.navigation.goBack();
				}
			}
		]);
	};

	render() {
		//const data = this.props.navigation.getParam('data');
		// console.log('rendering details: ' + this.state.data.name + ' : ' + JSON.stringify(this.state.data));
		// console.log('-----------------------------------------------------');
		//console.log('rendering details: props:' + JSON.stringify(data));
		//console.log('-----------------------------------------------------');
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<Image style={styles.img} source={this.state.data.photo} />
					<Text style={styles.text}>Name: {this.state.data.name}</Text>
					<Text style={styles.text}>Brand: {this.state.data.brand}</Text>
					<Text style={styles.text}>Details: {this.state.data.details}</Text>
					<Text style={styles.text}>Main Cetegory: {this.state.data.mainCategory}</Text>
					<Text style={styles.text}>Sub Category: {this.state.data.subCategory}</Text>
					<Text style={styles.text}>Size: {this.state.data.size}</Text>
					<Text style={styles.text}>Vendor: {this.state.data.vendor}</Text>
					<Text style={styles.text}>Price: ${this.state.data.price}</Text>
					<Text style={styles.text}>Acquisition Date: {this.state.data.acquisitionDate}</Text>
					<Text style={styles.text}>Start Date: {this.state.data.startDate}</Text>
					<Text style={styles.text}>Completion Date: {this.state.data.completionDate}</Text>
					<Text style={styles.text}>Expiry Date: {this.state.data.expiryDate}</Text>
					<Text style={styles.text}>Max Use: {this.state.data.maxUse}</Text>
					<Text style={styles.text}>Repurchase Item: {this.state.data.repurchaseItem ? 'Yes' : 'No'}</Text>
					<Text style={styles.text}>Notes: {this.state.data.note}</Text>
				</ScrollView>
				<RNModal
					isVisible={this.state.showOptions}
					backdropOpacity={0}
					onBackdropPress={() => {
						this.toggleOptions();
					}}
					onBackButtonPress={() => {
						this.toggleOptions();
					}}
					style={styles.moreOptions}
					animationIn="zoomInUp"
					animationOut="zoomOutDown"
				>
					<View>
						<TouchableOpacity
							onPress={() => {
								this.goToEditPage(this.state.data);
							}}
						>
							<Text style={styles.text}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.delete();
							}}
						>
							<Text style={styles.text}>Delete</Text>
						</TouchableOpacity>
					</View>
				</RNModal>
			</View>
		);
	}
}

//styles for the component
const styles = StyleSheet.create({
	container   : {
		flex            : 1,
		backgroundColor : '#F5FCFF'
	},
	text        : {
		fontSize : 20,
		margin   : 10
	},
	listItem    : {
		margin          : 5,
		padding         : 20,
		backgroundColor : '#F5FCFF'
	},
	img         : {
		flex       : 1,
		margin     : 5,
		alignSelf  : 'center',
		resizeMode : 'contain',
		maxWidth   : width,
		maxHeight  : width
		//backgroundColor : 'black'
	},
	moreOptions : {
		width           : 100,
		marginTop       : 55,
		position        : 'absolute',
		backgroundColor : '#fff',
		alignSelf       : 'flex-end'
	}
});
