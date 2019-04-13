import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { MainScreen, WebViewScreen } from '../features/browse'
import { translate, BackButton, typography, color, style } from '../shared'

const routes = {
    list: {
        screen: MainScreen,
        navigationOptions: {
            header: null,
        }
    },
    webview: {
        screen: WebViewScreen,
        navigationOptions: ({ navigation }) => ({
            headerStyle: style.navigationHeader,
            title: "Event Detail",
            headerLeft: <BackButton onPress={() => navigation.goBack(null)} />
        }),
    }
}

export const ListNavigator = createStackNavigator(routes, {
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
    initialRouteName: 'list'

})
