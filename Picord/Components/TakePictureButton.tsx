import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

type Props = typeof TakePictureButton.defaultProps & {
    onPress(): void;
}

type State = {
    
}

export class TakePictureButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    public static defaultProps = {
    }

    static navigationOptions = {

    };

    render() {
        return (
            <TouchableOpacity
                style={{}}
                onPress={this.props.onPress}
            >
                <View style={styles.circle} />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: 'grey',
        opacity: .8,
    }
});