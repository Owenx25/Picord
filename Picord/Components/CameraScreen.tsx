import React from 'react';
import { StyleSheet, View, Button, Image, TouchableHighlight } from 'react-native';

import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';

type Props = typeof CameraScreen.defaultProps & {

}

type State = {
    type: any
}

export class CameraScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: Camera.Constants.Type.back
        };
    }

    public static defaultProps = {
    }
    
    render() {
      return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1}} type={this.state.type} >
            
            </Camera>
        </View>
    )}
  }