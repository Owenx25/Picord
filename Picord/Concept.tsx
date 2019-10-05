import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, Modal } from 'react-native';

import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { TextSubmitDialog } from './TextSubmitDialog';


type Props = typeof Concept.defaultProps & {

}

type State = {
    image: string;
    titleModalVisible: boolean;
    newPicordingTitle: string;
}

export class Concept extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: null,
            titleModalVisible: false,
            newPicordingTitle: null
        };
    }

    public static defaultProps = {
    }

    public componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

    _addPicording = () => {
        // Make user Set a title for recording
        this.setTitleModalVisible(true);

        // Add flow:
        // Enter a title => Choose a picture => Add a recording => Saved to DB
        // or...
        // Add a recording => Choose a picture => Enter a title => Saved to DB
        //   Recording shoud probably be the FIRST thing the user enters. Title is
        //   a summary on top.
    }
        
    

    setTitleModalVisible(visible: boolean) {
        this.setState({ titleModalVisible: visible });
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

    _onSubmitPicordingTitle = (text: string): void => {    
        this.setTitleModalVisible(!this.state.titleModalVisible);
        if (text) {
            this.setState({ newPicordingTitle: text});
        }
        this.selectPictureFromCameraRoll();
    }
    _onCancelPicordingTitle = (): void => {
        this.setTitleModalVisible(!this.state.titleModalVisible);
        console.log('Picording was cancelled from title dialog');
    }
            

    render() {
        return (
            <View style={styles.container}>
                <TextSubmitDialog
                  isModalVisible={this.state.titleModalVisible}
                  onSubmit={this._onSubmitPicordingTitle}
                  onCancel={this._onCancelPicordingTitle}
                  titleText='Enter Picording Title'
                />
                <TouchableHighlight style={styles.imageContainer} onLongPress={this._addRecording}>
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