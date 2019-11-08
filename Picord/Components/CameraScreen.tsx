import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from 'react-native';

import { Camera } from 'expo-camera';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { CapturedPicture } from 'expo-camera/build/Camera.types';

enum CameraType {
    front = Camera.Constants.Type.front,
    back = Camera.Constants.Type.back
}

enum FlashType {
    on = 'on',
    off = 'off'
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
    pictureTaken: boolean,
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
            pictureTaken: false,
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
        if (this.camera) {
            let photo = await this.camera.current.takePictureAsync({
                quality: 1,
                onPictureSaved: this._onPictureSaved
            })
            this.camera.current.pausePreview();
        }
    }

    _onPictureSaved =  (photo: CapturedPicture) => {
        // Save photo to state then tell UI we have the picture 
        this.setState({photo: photo}, () => {this.setState({pictureTaken: true})});
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
        if (this.state.flash === FlashType.off) {
            return 'red';
        }
        return 'white';
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
                    <View
                        style={styles.CameraBottomContainer}
                    >
                        <View style={styles.LeftButtonContainer}>
                            <TouchableOpacity
                                style={styles.CameraButton}
                                onPress={this._onChangeCameraType}
                            >
                                <Text style={styles.CameraButtonText}>Flip</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.CenterButtonContainer}>
                            <TouchableOpacity
                                style={{}}
                                onPress={this._onTakePicture}
                            >
                                <View style={styles.circle} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.RightButtonContainer}>
                            <TouchableOpacity
                                style={[styles.CameraButton, {borderColor: this.flashStyle()}]}
                                onPress={this._onChangeCameraFlash}
                            >
                                <Text style={[styles.CameraButtonText, {color: this.flashStyle()}]}>Flash</Text>
                            </TouchableOpacity>
                            { this.isOnAndroid  &&
                                <TouchableOpacity
                                    style={styles.CameraButton}
                                    onPress={this._onPressRatioToggle}
                                >
                                    <Text style={styles.CameraButtonText}>{this.state.ratio}</Text>
                                </TouchableOpacity>
                            }
                        </View>   
                    </View>
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
    CameraButton: {
        width: 75,
        margin: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    CameraButtonText: {
        fontSize: 20,
        padding: 5,
        paddingHorizontal: 10,
        color: 'white'
    },
    TakePictureButton: {

    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: 'grey',
        opacity: .8,
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
