import React, { Component } from 'react';
import { Text, View, TextInput, Picker, StyleSheet } from 'react-native';

export default class FilterBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFilter : false,
			filterType : ''
		};
	}

	toggleFilter = () => {
		this.setState({ showFilter: !this.state.showFilter });
	};

	render() {
		return (
			<View style={styles.filterContainer}>
				<TouchableOpacity onPress={() => this.toggleFilter()}>
					<Text style={styles.filterLabel}>Filter</Text>
				</TouchableOpacity>
				<View style={[ this.state.showFilter ? { display: 'flex' } : { display: 'none' } ]}>
					<Picker
						selectedValue={this.state.filterType}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => {
							this.setState({ filterType: itemValue });
						}}
					>
						<Picker.Item label="Brand" value="brand" />
						<Picker.Item label="Main Category" value="mainCategory" />
						<Picker.Item label="Sub Category" value="subCategory" />
						<Picker.Item label="Vendor" value="vendor" />
					</Picker>

					<TextInput
						style={styles.textField}
						onChangeText={(input) => {
							this.filter(input);
						}}
						value={this.state.filterInput}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	filterContainer : {
		backgroundColor : '#DDDDDD',
		flexDirection   : 'row'
	},
	filterLabel     : {
		alignItems : 'center',
		alignSelf  : 'center',
		fontSize   : 20,
		fontWeight : 'bold',
		width      : '25%'
	},
	picker          : {
		height : 50,
		width  : '35%'
	},
	textField       : {
		borderWidth     : 1,
		borderColor     : '#AAAAAA',
		backgroundColor : '#F5FCFF',
		margin          : 5,
		padding         : 5,
		width           : '35%'
	}
});
