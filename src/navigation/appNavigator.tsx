import { createStackNavigator, createAppContainer } from 'react-navigation'

import { TabsNavigator } from './tabsNavigator';

const routes = {
  tabs: { screen: TabsNavigator },
}

const MainNavigator = createStackNavigator(routes, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'tabs',
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    },
    header: null,
    gesturesEnabled: false,
  },
  cardStyle: { shadowColor: 'transparent' }
})

export const AppNavigator = createAppContainer(MainNavigator);
