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
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    dialogBox: { 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#d1c4e9',
        width: 300,
        height: 150,
        borderRadius: 10
    },
    titleBox: {
        justifyContent: 'flex-start'
    },
    titleText: {
        padding: 10,
        fontSize: 22,
        color: '#512da8'
    },
    inputTextBox: {
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    inputText: {
        padding: 8,
        backgroundColor: 'white',
        opacity: .7,
        fontSize: 16
    },
    buttonBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        
    },
    button: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    messageText: {
        marginTop: 5,
        fontSize: 20,
        color: '#9575cd'
    }
})
