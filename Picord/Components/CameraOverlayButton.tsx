import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = typeof CameraOverlayButton.defaultProps & {
    text: string,
    textStyle?: any,
    buttonStyle?: any,
    onPress(): void
}

type State = {
    
}

export class CameraOverlayButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    public static defaultProps = {
        text: ''
    }

    static navigationOptions = {

    };

    render() {
        return (
            <TouchableOpacity
                style={[styles.CameraButton, this.props.buttonStyle]}
                onPress={this.props.onPress}
            >
                <Text style={[styles.CameraButtonText, this.props.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    CameraButton: {
        width: 75,
        margin: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    CameraButtonText: {
        fontSize: 20,
        padding: 5,
        paddingHorizontal: 10,
        color: 'white'
    }
});