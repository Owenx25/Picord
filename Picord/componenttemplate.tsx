import React from 'react';
import { View } from 'react-native';

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

type Props = typeof NAME.defaultProps & {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
    
}

export class NAME extends React.Component<Props, State> {
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
            <View/>
        );
    }
}