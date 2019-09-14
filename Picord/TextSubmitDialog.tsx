import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, GestureResponderEvent, TextInput } from 'react-native';

export interface Props {
    isModalVisible : boolean;
    onSubmit: (text: string) => void;
    onCancel: (event: GestureResponderEvent) => void;
    titleText: string;
    submitText: string;
    cancelText: string;
}

interface State {
    inputText: string;
}

export class TextSubmitDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputText: ''
        };
    }

    public static defaultProps = {
        submitText: 'submit',
        cancelText: 'cancel'
    }

    public componentDidMount() {
    }

    _onChangeText = (text: string): void => { this.setState({inputText: text}) }
    _onSubmit = (event: GestureResponderEvent): void => { this.props.onSubmit(this.state.inputText); }

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
                                <View style={[styles.button, {paddingStart: 5}]}>
                                    <Text style={{fontSize: 20, color: '#7d3c98'}}>{this.props.submitText}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <View style={[styles.button, {paddingEnd: 5}]}>
                                    <Text style={{fontSize: 20, color: '#7d3c98'}}>{this.props.cancelText}</Text>
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
        height: 150
    },
    titleBox: {
        justifyContent: 'flex-start'
    },
    titleText: {
        paddingTop: 5,
        paddingStart: 5,
        fontSize: 22,
        color: '#512da8'
    },
    inputTextBox: {

    },
    inputText: {
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    buttonBox: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1c4e9'
    },
    messageText: {
        marginTop: 5,
        fontSize: 20,
        color: '#9575cd'
    }
})