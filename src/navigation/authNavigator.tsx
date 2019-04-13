import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../features/auth'
import { translate, BackButton, typography, color, style } from '../shared'

const routes = {
  account: {
    screen: LoginScreen,
    navigationOptions: {
      headerStyle: style.navigationHeader,
      title: translate('tabs.signin').toUpperCase(),
    }
  },
  register: {
    screen: RegisterScreen,
    navigationOptions:({ navigation }) => ({
      headerStyle: style.navigationHeader,
      title: translate('tabs.createAccount').toUpperCase(),
      headerLeft: null,
    }),
  },
  forgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions:({ navigation }) => ({
      headerStyle: style.navigationHeader,
      title: translate('tabs.forgot').toUpperCase(),
      headerLeft: null,
    }),
  },
}

export const AuthNavigator = createStackNavigator(routes, {
  mode: 'card',
  cardStyle: {
    backgroundColor: color.offWhite,
    elevation: 0, //remove shadow on Android
    shadowOpacity: 0, //remove shadow on iOS
  },
  navigationOptions: ({ navigation }) => ({
    headerTitleStyle: typography.navigationHeader,
    headerStyle: style.navigationHeader,
    headerLeft: null,
    headerTintColor: color.white,
    headerRight: null,
}),
})
