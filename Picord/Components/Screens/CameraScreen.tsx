import React from 'react';
import { View, Platform, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Camera } from 'expo-camera';
import { CapturedPicture } from 'expo-camera/build/Camera.types';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

import { TakePictureButton } from '../TakePictureButton';
import { CameraOverlayButton } from '../CameraOverlayButton';
import { OrientationInfo } from 'expo/build/ScreenOrientation/ScreenOrientation';

enum CameraType {
    front = Camera.Constants.Type.front,
    back = Camera.Constants.Type.back
}

enum FlashType {
    on = Camera.Constants.FlashMode.on,
    off = Camera.Constants.FlashMode.off
}

type Props = typeof CameraScreen.defaultProps & {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
    type: CameraType
    ratio: string,
    ratioIndex: number,
    ratios: Array<string>,
    flash: FlashType,
    isShowingPreview: boolean,
    photo: CapturedPicture
}

export class CameraScreen extends React.Component<Props, State> {
    private camera: React.RefObject<Camera>

    constructor(props: Props) {
        super(props);
        this.camera = React.createRef();
        this.state = {
            type: CameraType.front,
            ratio: '16:9',
            ratioIndex: 0,
            ratios: undefined,
            flash: FlashType.off,
            isShowingPreview: false,
            photo: null
        };
    }

    public static defaultProps = {
    }

    static navigationOptions = {
        header: null
    };

    _onChangeCameraType = () => {
        this.setState({
            type:
                this.state.type === CameraType.back
                ? CameraType.front
                : CameraType.back
        });
    }

    _onChangeCameraFlash = () => {
        this.state.flash === FlashType.on
        ? this.setState({flash: FlashType.off})
        : this.setState({flash: FlashType.on});
    }

    _onPressRatioToggle = () => {
        this.getRatios()
        .then((ratios) => {
            this.setState({ratio: this.state.ratios[this.state.ratioIndex]})
            this.state.ratioIndex === ratios.length - 1
                ? this.setState({ ratioIndex: 0 })
                : this.setState({ ratioIndex: this.state.ratioIndex + 1 })
        });
    }

    _onTakePicture = async () => {
        console.log(this.state.flash);
        if (this.camera) {
            let photo = await this.camera.current.takePictureAsync({
                quality: 1,
                onPictureSaved: this._onPictureTaken
            })
            this.camera.current.pausePreview();
            // Picture is now frozen on UI, need to render buttons on top
        }
    }

    _onPictureTaken =  (photo: CapturedPicture) => {
        // Save photo to state then tell UI we have the picture 
        this.setState({photo: photo}, () => {this.setState({isShowingPreview: true})});
        // Orientation needs to be locked for the preview
        ScreenOrientation.getOrientationAsync()
        .then(orientationInfo => ScreenOrientation.lockAsync(this.getOrientationLock(orientationInfo.orientation)));
        //console.log('orientation locked');
    }

    getOrientationLock = (orientation: ScreenOrientation.Orientation) => {
        //console.log('current orientation is ' + orientation);
        if (orientation === ScreenOrientation.Orientation.LANDSCAPE
          || orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
          || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
            return ScreenOrientation.OrientationLock.LANDSCAPE;
        } else if (orientation === ScreenOrientation.Orientation.PORTRAIT
          || orientation === ScreenOrientation.Orientation.PORTRAIT_UP
          || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN    
        ) {
            return ScreenOrientation.OrientationLock.PORTRAIT;
        } 
    }

    _onPictureReset = () => {
        ScreenOrientation.unlockAsync();
        console.log('orientation unlocked after retake');
        // User wants to retake the picture
        this.setState({isShowingPreview: false});
        this.camera.current.resumePreview();
    }

    _onPictureSaved = () => {
        ScreenOrientation.unlockAsync();
        console.log('orientation unlocked after saving');
        // Picture is saved and we setup for recording
        // Save to permanent directory
        FileSystem.copyAsync({from: this.state.photo.uri, to: FileSystem.documentDirectory + 'Pictures'});
        // Add record button

    }

    async getRatios(): Promise<Array<string>> {
        if (this.state.ratios === undefined) {
            const ratios = await this.camera.current.getSupportedRatiosAsync();
            this.setState({
                ratios: ratios
            })
        }
        return Promise.resolve(this.state.ratios);
    };

    isOnAndroid(): boolean {
        return Platform.OS === 'android';
    }

    flashStyle(): string {
        if (this.state.flash === Camera.Constants.FlashMode.off) {
            return 'red';
        }
        return 'white';
    }

    getOverlayComponent(): JSX.Element {
        if (this.state.isShowingPreview) {
            return ( 
                <View style={[styles.CameraTopContainer, {marginTop: Constants.statusBarHeight}]}>
                    <View style={styles.LeftButtonContainer}>
                        <TouchableOpacity onPress={this._onPictureReset} style={{marginTop: 10, marginStart: 10}}>
                            <MaterialIcons name="close" size={48} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.RightButtonContainer}>
                        <TouchableOpacity onPress={this._onPictureSaved} style={{marginTop: 10, marginEnd: 10}}>
                            <MaterialIcons name="chevron-right" size={48} color='white'/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.CameraBottomContainer}>
                    <View style={styles.LeftButtonContainer}>
                        <CameraOverlayButton onPress={this._onChangeCameraType} text='Flip'/>
                    </View>
                    <View style={styles.CenterButtonContainer}>
                        <TakePictureButton onPress={this._onTakePicture}/>
                    </View>
                    <View style={styles.RightButtonContainer}>
                        <CameraOverlayButton
                            onPress={this._onChangeCameraFlash}
                            buttonStyle={{borderColor: this.flashStyle()}}
                            textStyle={{color: this.flashStyle()}}
                            text='Flash'
                        />
                        { this.isOnAndroid && 
                            <CameraOverlayButton onPress={this._onPressRatioToggle} text={this.state.ratio} />
                        }
                    </View>   
                </View>
            )
        }
    }

    showCamera(): JSX.Element {
        return  (
            <Camera 
                ref={this.camera}
                style={{ flex: 1}} 
                type={this.state.type} 
                ratio={this.state.ratio}
                flashMode={this.state.flash}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',                   
                }}>
                    {this.getOverlayComponent()}
                </View>
            </Camera>
        )
    }

    showNewPicture(): JSX.Element {
        console.log(this.state.photo);
        return (
            this.state.photo && <Image source={{uri: this.state.photo.uri}} style={{flex:1}} resizeMode='stretch'/>
        )
    }
    
    render() {
      return (
        <View style={{ flex: 1 }}>
            {this.showCamera()}
        </View>
    )}
  }
  const styles = StyleSheet.create({
    CameraBottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white'
    },
    CameraTopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white'
    },
    LeftButtonContainer: {
        borderWidth: 1,
        borderColor: 'white'
    },
    CenterButtonContainer: {
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center'
    },
    RightButtonContainer: {
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: 'white'
    }
  });
