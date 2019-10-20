import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';

import { Camera } from 'expo-camera';

enum CameraType {
    front = Camera.Constants.Type.front,
    back = Camera.Constants.Type.back
}

enum FlashType {
    on = 'on',
    off = 'off'
}

type Props = typeof CameraScreen.defaultProps & {

}

type State = {
    type: CameraType
    ratio: string,
    ratioIndex: number,
    ratios: Array<string>,
    flash: FlashType
}

export class CameraScreen extends React.Component<Props, State> {
    private camera: React.RefObject<Camera>

    constructor(props: Props) {
        super(props);
        this.camera = React.createRef();
        this.state = {
            type: CameraType.back,
            ratio: '16:9',
            ratioIndex: 0,
            ratios: undefined,
            flash: FlashType.off
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
            const photo = await this.camera.current.takePictureAsync();
        }
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
    
    render() {
      return (
        <View style={{ flex: 1 }}>
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
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: 'white'
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'white'
                            }}    
                        >
                            <TouchableOpacity
                                style={styles.CameraButton}
                                onPress={this._onChangeCameraType}
                            >
                                <Text style={styles.CameraButtonText}>Flip</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'white',
                                alignSelf: 'center'
                            }} 
                        >
                            <TouchableOpacity
                                style={{}}
                                onPress={this._onTakePicture}
                            >
                                <View style={styles.circle} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                borderWidth: 1,
                                borderColor: 'white'
                            }}
                        >
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
        </View>
    )}
  }
  const styles = StyleSheet.create({

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
        opacity: .3,
    }
  });
