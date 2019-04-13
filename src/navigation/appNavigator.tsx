import { createStackNavigator, createAppContainer } from 'react-navigation'
import { AuthNavigator } from './authNavigator'
import { TabsNavigator } from './tabsNavigator';

const routes = {
  auth: { screen: AuthNavigator },
  tabs: { screen: TabsNavigator },
}

const MainNavigator = createStackNavigator(routes, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'auth',
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
