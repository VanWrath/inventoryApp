import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	CameraRoll,
	PermissionsAndroid,
	Dimensions,
	ScrollView,
	Modal
} from 'react-native';
import RNModal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';

const { height, width } = Dimensions.get('window');
const defaultImageSrc = require('../../images/default.jpg');

//Enum for flash mode icon.
const flashModeImage = {
	flashOn   : require('../../images/icons8-flash-on-white-48.png'),
	flashOff  : require('../../images/icons8-flash-off-white-48.png'),
	flashAuto : require('../../images/icons8-flash-auto-white-48.png')
};

//Enum for flash mode variables
const flash = {
	auto : RNCamera.Constants.FlashMode.auto,
	on   : RNCamera.Constants.FlashMode.on,
	off  : RNCamera.Constants.FlashMode.off
};

//Enum for camera type
const cameraType = {
	front : RNCamera.Constants.Type.front,
	back  : RNCamera.Constants.Type.back
};

export default class ImagePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible     : false,
			showPhotoGallery : false,
			showCamera       : false,
			photoTaken       : false,
			img              : !this.props.value ? defaultImageSrc : this.props.value,
			photos           : [],
			camera           : cameraType.back,
			flashMode        : flash.auto,
			flashImage       : flashModeImage.flashAuto
			//index            : null
		};
	}

	//requests READ_EXTERNAL_STORAGE permission from user. Make sure permission is added to AndroidManifest.xml
	requestStoragePermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
				title          : 'Storage Permission',
				message        : 'App needs to access your storage',
				buttonNeutral  : 'Ask Me Later',
				buttonNegative : 'Cencel',
				buttonPositive : 'OK'
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				/*if (granted) */
				//console.log('App can access storage');
				return granted;
			} else {
				//console.log('Storage Permission denied');
				return granted;
			}
		} catch (err) {
			console.warn(err);
		}
	};

	requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
				title          : 'App Camera Permission',
				message        : 'App needs access to your camera',
				buttonNeutral  : 'Ask Me Later',
				buttonNegative : 'Cancel',
				buttonPositive : 'OK'
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the camera');
				return granted;
			} else {
				console.log('Camera permission denied');
				return granted;
			}
		} catch (err) {
			console.warn(err);
		}
	};

	//controls the visibility of the modal
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	setGalleryVisible(visible) {
		this.setState({ showPhotoGallery: visible });
	}

	setCameraVisible(visible) {
		this.setState({ showCamera: visible });
	}

	//opens camera to take and save a new photo
	openCamera = () => {
		this.setCameraVisible(true);
		this.setModalVisible(false);
	};

	takePicture = async () => {
		if (this.camera) {
			const options = { quality: 0.5, base64: false, pauseAfterCapture: true, fixOrientation: true };
			const data = await this.camera.takePictureAsync(options);
			this.setState({ img: data, photoTaken: true });
		}
	};

	toggleCamera = () => {
		if (this.state.camera == cameraType.back) {
			this.setState({ camera: cameraType.front });
		} else {
			this.setState({ camera: cameraType.back });
		}
	};

	//toggles the flash setting for the camera
	toggleFlash = () => {
		switch (this.state.flashMode) {
			case flash.auto:
				this.setState({ flashMode: flash.off, flashImage: flashModeImage.flashOff });
				break;
			case flash.off:
				this.setState({ flashMode: flash.on, flashImage: flashModeImage.flashOn });
				break;
			case flash.on:
				this.setState({ flashMode: flash.auto, flashImage: flashModeImage.flashAuto });
				break;
		}
	};

	//opens photo gallery to set the photo
	openGallery = () => {
		this.requestStoragePermission().then((didGetPermission) => {
			if (didGetPermission) {
				CameraRoll.getPhotos({ first: 100 }).then((res) => {
					this.setState({ photos: res.edges });
					this.setModalVisible(false);
					this.setGalleryVisible(true);
				});
			} else {
				console.log('Require storage permissions');
			}
		});
	};

	//removes selected photo
	deletePhoto = () => {
		this.setState({ img: defaultImageSrc });
		this.props.onChangePhoto(defaultImageSrc); //(this.state.img);
		this.setModalVisible(false);
	};

	//render item for the gallery list
	renderItem = (item, key) => {
		const image = item.node.image;
		//const image = this.state.photos[key].node.image;
		return (
			<TouchableOpacity
				key={key}
				onPress={(image) => {
					this.setState({ img: this.state.photos[key].node.image });
					//this.setState({ img: image });
					this.props.onChangePhoto(this.state.photos[key].node.image);
					this.setGalleryVisible(false);
				}}
			>
				<Image style={styles.image} source={image} />
			</TouchableOpacity>
		);
	};

	//<PhotoViewer isVisible={this.state.showPhotoGallery} photosList={this.state.photos} />
	render() {
		return (
			<View style={styles.container}>
				{/*Camera Modal*/}
				<Modal animationType="slide" transparent={false} visible={this.state.showCamera}>
					<View style={styles.cameraContainer}>
						<Image
							source={this.state.img}
							style={[ this.state.photoTaken ? styles.imagePreview : { display: 'none' } ]}
						/>
						<RNCamera
							ref={(ref) => {
								this.camera = ref;
							}}
							style={[ this.state.photoTaken ? { display: 'none' } : styles.cameraPreview ]}
							flashMode={this.state.flashMode}
							captureAudio={false}
							type={this.state.camera}
							//ratio={'4:3'}
							androidCameraPermissionOptions={{
								title           : 'Permission to use camera',
								message         : 'We need your permission to use your camera',
								buttonPoositive : 'Ok',
								buttonNegative  : 'Cancel'
							}}
						/>

						<TouchableOpacity
							style={{
								position : 'absolute',
								start    : 0
							}}
							onPress={() => {
								if (!this.state.photoTaken) {
									this.setCameraVisible(false);
								} else {
									this.setState({
										img        : defaultImageSrc,
										photoTaken : false
									});
								}
							}}
						>
							<Image source={require('../../images/icons8-delete-filled-white-48.png')} />
						</TouchableOpacity>

						{/*Add Camera Toggles */}
						<TouchableOpacity
							style={[
								this.state.photoTaken
									? { display: 'none' }
									: {
											position : 'absolute',
											padding  : 5,
											end      : 60
										}
							]}
							onPress={() => {
								this.toggleCamera();
							}}
						>
							<Image source={require('../../images/icons8-rotate-camera-white-48.png')} />
						</TouchableOpacity>

						<TouchableOpacity
							style={[
								this.state.photoTaken
									? { display: 'none' }
									: {
											position : 'absolute',
											padding  : 5,
											end      : 0
										}
							]}
							onPress={() => {
								this.toggleFlash();
							}}
						>
							<Image source={this.state.flashImage} />
						</TouchableOpacity>

						{/*Capture photo button */}
						<TouchableOpacity
							onPress={() => {
								this.takePicture();
							}}
							style={[ this.state.photoTaken ? { display: 'none' } : styles.captureButton ]}
						>
							<View
								style={{
									margin          : 10,
									width           : 70,
									height          : 70,
									borderRadius    : 70,
									backgroundColor : '#fff'
								}}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.props.onChangePhoto(this.state.img);
								this.setState({ photoTaken: false, showCamera: false });
							}}
							style={[
								this.state.photoTaken
									? {
											flexDirection  : 'row',
											justifyContent : 'flex-end',
											alignItems     : 'flex-end',
											alignSelf      : 'flex-end',
											position       : 'absolute',
											end            : 0
										}
									: { display: 'none' }
							]}
						>
							<Text
								style={{
									fontSize          : 14,
									borderRadius      : 30,
									backgroundColor   : '#fff',
									padding           : 10,
									paddingHorizontal : 20,
									margin            : 15
								}}
							>
								Done
							</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				{/*Gallery Modal */}
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.showPhotoGallery}
					onRequestClose={() => console.log('closed')}
				>
					<View style={styles.gallery}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity
								onPress={() => {
									this.setGalleryVisible(false);
								}}
							>
								<Image
									source={require('../../images/icons8-delete-48.png')}
									style={{ width: 30, height: 30, margin: 5 }}
								/>
							</TouchableOpacity>
							<Text style={styles.titleText}>Choose a photo</Text>
						</View>

						<ScrollView contentContainerStyle={styles.scrollView}>
							{this.state.photos.map((image, i) => {
								return this.renderItem(image, i);
							})}
						</ScrollView>
					</View>
				</Modal>

				{/*Popup menu modal */}
				<RNModal
					isVisible={this.state.modalVisible}
					backdropOpacity={0.4}
					onBackdropPress={() => {
						this.setModalVisible(false);
					}}
				>
					<View>
						<View style={styles.modal}>
							<TouchableOpacity style={styles.modalItems} onPress={this.openCamera}>
								<Text style={styles.modalText}>Take a new photo</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.modalItems} onPress={this.openGallery}>
								<Text style={styles.modalText}>Choose from gallery</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[ this.state.img == defaultImageSrc ? { display: 'none' } : styles.modalItems ]}
								onPress={this.deletePhoto}
							>
								<Text style={styles.modalText}>Delete photo</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.modalItems}
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
							>
								<Text style={styles.modalText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</RNModal>

				<TouchableOpacity
					onPress={() => {
						this.setModalVisible(true);
					}}
					style={[ this.state.img == defaultImageSrc ? styles.mainComponent : {} ]}
				>
					<Text
						style={[
							styles.componentText,
							this.state.img === defaultImageSrc ? { display: 'flex' } : { display: 'none' }
						]}
					>
						Add Photo
					</Text>
					<Image
						source={this.state.img}
						style={[
							this.state.img === defaultImageSrc
								? { display: 'none' }
								: { display: 'flex', resizeMode: 'contain', width: width, maxHeight: width }
						]}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container       : {
		flex         : 1,
		alignItems   : 'center',
		marginBottom : 10
	},
	mainComponent   : {
		justifyContent  : 'center',
		alignItems      : 'center',
		height          : 200,
		width           : width,
		backgroundColor : '#4d4d4d',
		padding         : 10
	},
	componentText   : {
		color        : 'white',
		padding      : 8,
		borderWidth  : 2,
		borderColor  : 'white',
		borderRadius : 5
	},
	modal           : {
		justifyContent   : 'center',
		marginHorizontal : 60,
		backgroundColor  : '#fff'
	},
	modalText       : {
		fontSize : 17,
		margin   : 10
	},
	gallery         : {
		justifyContent : 'center',
		alignItems     : 'flex-start',
		paddingTop     : 10,
		flex           : 1,
		flexWrap       : 'wrap'
	},

	image           : {
		width      : width / 3,
		height     : width / 3,
		resizeMode : 'contain'
	},
	scrollView      : {
		flexWrap      : 'wrap',
		flexDirection : 'row',
		marginTop     : 10
	},

	titleText       : {
		fontSize   : 20,
		fontWeight : 'bold',
		color      : 'black',
		padding    : 5,
		marginLeft : 10,
		width      : width / 2
	},
	cameraContainer : {
		flex            : 1,
		justifyContent  : 'center',
		flexDirection   : 'row',
		backgroundColor : 'black'
	},
	cameraPreview   : {
		flex           : 1,
		justifyContent : 'flex-end',
		alignItems     : 'center'
	},
	imagePreview    : {
		flex           : 1,
		justifyContent : 'flex-start',
		alignItems     : 'center',
		width          : width,
		height         : height,
		resizeMode     : 'contain'
	},
	/*capture         : {
		flex              : 1,
		backgroundColor   : '#fff',
		borderRadius      : 5,
		padding           : 15,
		paddingHorizontal : 20,
		alignItems        : 'center',
		margin            : 10
	},*/
	captureButton   : {
		justifyContent : 'center',
		alignItems     : 'center',
		alignSelf      : 'flex-end',
		position       : 'absolute'
	}
});
