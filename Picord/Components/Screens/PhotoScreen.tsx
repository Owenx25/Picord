import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { CapturedPicture } from 'expo-camera/build/Camera.types';


type Props = typeof PhotoScreen.defaultProps & {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
    photo: CapturedPicture

}

export class PhotoScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            photo: this.props.navigation.getParam('photo', undefined)
        };
        console.log(this.state.photo);
    }

    public static defaultProps = {
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                { this.state.photo &&
                    <Image source={{uri: this.state.photo.uri}} />
                }
            </View>
        );
    }
}