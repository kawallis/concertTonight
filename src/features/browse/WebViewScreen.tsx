import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Dimensions, WebView, ActivityIndicator } from 'react-native';
import { Button, color, style } from '../../shared'


type Props = {}
type State = {}
const screenHeight = Dimensions.get("window").height - 70;

export class WebViewScreen extends Component<Props, State> {

    render() {
        const { navigation } = this.props;
        const url = navigation.getParam('url', '');
        console.log("URL", url)

        if (!url)
            return (<View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>)
        else
            return (
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: url }}
                    style={{
                        width: '100%',
                        height: 300,
                    }} />
            )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.offWhite,
        padding: 10,
        paddingTop: 20
    },
});