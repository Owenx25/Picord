import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, Modal, GestureResponderEvent } from 'react-native';

export interface Props {
    isModalVisible : boolean;
    onSubmit: (GestureResponderEvent) => void;
    onCancel: (GestureResponderEvent) => void;
    submitText: string;
    cancelText: string;
}

interface State {
    titleModalVisible: boolean;
}

export class TextSubmitDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            titleModalVisible: false,
        };
    }

    public static defaultProps = {
        submitText: 'submit',
        cancelText: 'cancel'
    }

    public componentDidMount() {
    }

    render(): JSX.Element {
        return (
            <Modal 
            animationType='slide'
            transparent={false}
            visible={this.props.isModalVisible}
            onRequestClose={() => { console.log('Add textSubmitDialog was opened.')}}>
                <View style={{ marginTop: 22 }}>
                    <Text>What's the title of your Picording?</Text>
                    <TouchableHighlight
                      onPress={this.props.onSubmit}>
                        <Text>{this.props.submitText}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={this.props.onCancel}>
                    <Text>{this.props.cancelText}</Text>
                </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}