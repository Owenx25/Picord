import React from 'react';
import { Concept } from './Components/Screens/Concept';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CameraScreen } from './Components/Screens/CameraScreen'
import { PhotoScreen } from './Components/Screens/PhotoScreen'

type Props = typeof HomeScreen.defaultProps & {
  navigation: NavigationType
}

class HomeScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Concept navigation={this.props.navigation}/>
  )}
}

const AppNavigator = createStackNavigator({
  HomeScreen: HomeScreen,
  CameraScreen: CameraScreen,
  PhotoScreen: PhotoScreen
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