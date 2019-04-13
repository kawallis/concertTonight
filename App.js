import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from './src/navigation/appNavigator';
import { auth } from './firebase'

export default class App extends React.Component {

  componentDidMount() {
    this.unsub = auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.navigator &&
        this.navigator.dispatch(
          NavigationActions.navigate({ routeName: "main" })
        );
      } else {

      }
    })
  }

  componentWillUnmount() {
    this.unsub()
  }

  render() {
    return (
      <AppNavigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
