import React from 'react';
import { StyleSheet, View, Button, Image, TouchableHighlight } from 'react-native';

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';


type Props = typeof Concept.defaultProps & {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
    image: string;
    hasCameraPermission: boolean;
}

export class Concept extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: null,
            hasCameraPermission: null
        };
    }

    public static defaultProps = {
    }

    public componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
        } 
        this.setState({hasCameraPermission: status === 'granted'});
    }

    selectPictureFromCameraRoll = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri }) 
        }
    }

    addPictureToFileSystem = async () => {
        // This dir should probably be created on first app init
        FileSystem.getInfoAsync(FileSystem.documentDirectory + 'Pictures')
        .then(result => {
            // The photos should get copied over to a permanent app dir so that
            // we don't have to worry about losing them. They can still be deleted
            // from within the app(just like recordings)
            if(result.exists) {

            }
        })
        .catch(() => {
            console.error('failed trying to find pictures folder')
        })
    }

    _addPicording = () => {
        console.log('Navigating to CameraScreen');
        this.props.navigation.navigate('CameraScreen');
        // Make user Set a title for recording

        // Add flow:
        // Enter a title => Choose a picture => Add a recording => Saved to DB
        // or...
        // Add a recording => Choose a picture => Enter a title => Saved to DB
        //   Recording shoud probably be the FIRST thing the user enters. Title is
        //   a summary on top.
    }

    _addRecording = async () => {
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
        } catch(error) {
            // an error occurred
            console.log('error getting permissions for recording');
        }
    }

    showImage() : JSX.Element {
        if (this.state.image) {
            return <Image style={styles.image} source={{uri: this.state.image}} />
        } else {
            return <View/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.imageContainer} onLongPress={this._addPicording}>
                    { this.showImage() }
                </TouchableHighlight>
                <Button title="Add Picording" onPress={this._addPicording}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
  
    },
    image: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: 'blue'
    }
  });