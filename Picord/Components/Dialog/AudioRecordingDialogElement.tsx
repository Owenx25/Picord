import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, GestureResponderEvent, TextInput } from 'react-native';

type Props = typeof AudioRecordingDialogElement.defaultProps & {

}

const initialState = {
   
};

type State = Readonly <typeof initialState>

export class AudioRecordingDialogElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public static defaultProps = {
        
    }

    public componentDidMount() {
    }


    render(): JSX.Element {
        return (
            <View style={styles.audioControlsBox}>
                <TouchableOpacity>
                    <View style={styles.recordingIcon} />
                </TouchableOpacity>
                    <View style={[styles.playIcon, {marginLeft: 15}]}/>
                <TouchableOpacity/>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    audioControlsBox: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "row"
        
    },
    inputText: {
        padding: 8,
        backgroundColor: 'white',
        opacity: .7,
        fontSize: 16
    },
    recordingIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'red'
    },
    playIcon: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'purple',
        transform: [
            {rotate: '90deg'}
        ]
    }
})
