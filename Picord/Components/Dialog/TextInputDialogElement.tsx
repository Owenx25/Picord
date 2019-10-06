import React from 'react';
import { StyleSheet, View, GestureResponderEvent, TextInput } from 'react-native';

type Props = typeof TextInputDialogElement.defaultProps & {
    initialText: string;
    _onChangeText: (text: string) => void;
}

const initialState = {
    text: ''
};
type State = Readonly <typeof initialState>

export class TextInputDialogElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public static defaultProps = {
        initialText: '',
        _onChangeText: (text: string) => {}
    }

    public componentDidMount() {
    }

    render(): JSX.Element {
        return (
            <View style={styles.inputTextBox}>
                <TextInput 
                style={styles.inputText}
                onChangeText={this.props._onChangeText}
                autoCorrect={true}
                clearButtonMode='while-editing'
                placeholder={this.props.initialText}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputTextBox: {
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    inputText: {
        padding: 8,
        backgroundColor: 'white',
        opacity: .7,
        fontSize: 16
    }
})