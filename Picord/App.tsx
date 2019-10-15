import React from 'react';
import { Concept } from './Components/Concept';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CameraScreen } from './Components/CameraScreen'

type Props = typeof HomeScreen.defaultProps & {
  navigation: NavigationType
}

class HomeScreen extends React.Component<Props, {}> {
  render() {
    return (
      <Concept navigation={this.props.navigation}/>
  )}
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Camera: CameraScreen
});

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
// Color Scheme ideas:
// Purple palette
// #311b92
// #512da8
// #673ab7
// #5e35b1
// #283593
// #d84315