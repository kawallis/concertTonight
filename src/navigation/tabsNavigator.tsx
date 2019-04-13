import React from 'react'
import { createBottomTabNavigator, StackActions, NavigationActions } from 'react-navigation';
import { translate, BackButton, typography, color, style, Icon } from '../shared'
import { MainScreen, SettingsScreen, ChatScreen } from '../features/browse'
import { Ionicons } from '@expo/vector-icons';
import { ListNavigator } from './listNavigator';

const tabImageStyle = {
    width: 25,
    height: 25,
}

export const routes = {
    settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: "Settings Screen",
            tabBarTestID: 'authScreen',
            header: null,
            tabBarIcon: ({ focused, tintColor }) =>
                <Icon icon='settingsIcon' brand={focused} style={tabImageStyle} />,
        },
    },
    chat: {
        screen: ChatScreen,
        navigationOptions: {
            title: "Chat",
            tabBarTestID: 'authScreen',
            header: null,
            tabBarIcon: ({ focused, tintColor }) =>
                <Ionicons name="md-chatboxes" size={32} color={color.darkGray} />
        },
    },
    main: {
        screen: ListNavigator,
        navigationOptions: {
            title: "List Screen",
            tabBarTestID: 'listScreen',
            headerTitleStyle: typography.navigationHeader,
            headerStyle: style.navigationHeader,
            tabBarIcon: ({ focused, tintColor }) =>
                <Icon icon='profileHelpIcon' brand={focused} style={tabImageStyle} />,
        },
    }
}

export const TabsNavigator = createBottomTabNavigator(routes, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: color.white,
            height: 49,
            shadowColor: color.mediumGray,
            borderTopColor: color.white,
            shadowRadius: 8,
            shadowOpacity: 1,
            shadowOffset: {
                height: 5,
                width: 0,
            }
        },
        labelStyle: typography.tabLabel,
        upperCaseLabel: true,
        activeTintColor: color.black,
        inactiveTintColor: color.mediumGray,
    },
    backBehavior: 'none',
    initialRouteName: 'main',
});
