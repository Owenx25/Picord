import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, GestureResponderEvent, TextInput } from 'react-native';

type Props = typeof TextSubmitDialog.defaultProps & {
    isModalVisible : boolean;
    onSubmit: (text: string) => void;
    onCancel: (event: GestureResponderEvent) => void;
    titleText: string;
    submitText: string;
    cancelText: string;
}

const initialState = {
    inputText: ''
};
type State = Readonly <typeof initialState>

export class TextSubmitDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public static defaultProps = {
        submitText: 'submit',
        cancelText: 'cancel'
    }

    public componentDidMount() {
    }

    _onChangeText = (text: string) => { this.setState({inputText: text}) }
    _onSubmit = (event: GestureResponderEvent) => { this.props.onSubmit(this.state.inputText); }

    render(): JSX.Element {
        return (
            <Modal 
            animationType='slide'
            transparent={true}
            visible={this.props.isModalVisible}
            onRequestClose={() => { console.log('Add textSubmitDialog was opened.')}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.dialogBox}>
                        <View style={styles.titleBox}>
                            <Text style={styles.titleText}>{this.props.titleText}</Text>
                        </View>
                        <View style={styles.inputTextBox}>
                            <TextInput 
                              style={styles.inputText}
                              onChangeText={this._onChangeText}
                              autoCorrect={true}
                              clearButtonMode='while-editing'/>
                        </View>
                        <View style={styles.buttonBox}> 
                            <TouchableOpacity onPress={this._onSubmit}>
                                <View style={[styles.button, {paddingStart: 10}]}>
                                    <Text style={{fontSize: 16, color: '#512da8'}}>{this.props.submitText}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <View style={[styles.button, {paddingEnd: 10}]}>
                                    <Text style={{fontSize: 16, color: '#512da8'}}>{this.props.cancelText}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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