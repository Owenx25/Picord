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

    flashStyle() {
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
                        flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={styles.CameraButton}
                        onPress={this._onChangeCameraType}
                    >
                        <Text style={styles.CameraButtonText}>Flip</Text>
                    </TouchableOpacity>
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
            </Camera>
        </View>
    )}
  }
  const styles = StyleSheet.create({
    CameraButton: {
        flex: 0.2,
        marginBottom: 20,
        marginLeft: 20, 
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    CameraButtonText: {
        fontSize: 24,
        padding: 5,
        color: 'white'
    }
  });
