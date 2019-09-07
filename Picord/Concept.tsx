import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';


export interface Props {

}

interface State {
    image: string;
}


export class Concept extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: null
        };
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

    _pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    _addRecording = async () => {
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
        } catch(error) {
            // an error occurred
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.imageContainer} onLongPress={this._addRecording}>
                    { this.state.image && <Image style={styles.image} source={{uri: this.state.image}} />}
                </TouchableHighlight>

                <Button title="Add Picture" onPress={this._pickImage}/>
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