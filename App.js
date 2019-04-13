import React from 'react';
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from './src/navigation/appNavigator';
import { auth } from './firebase'
import { AppLoading } from 'expo';

export default class App extends React.Component {

  state = {
    isReady: false,
  };

  componentDidMount() {
    this.unsub = auth.onAuthStateChanged((user) => {

      if (user) {
        this.setState({ isReady: true }, () => {
          this.navigator &&
          this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "tabs" })
          );
        })
        

      } else {
        this.setState({ isReady: true }, () => {
          this.navigator &&
          this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "auth" })
          );
        })
        
      }
    })
  }

  componentWillUnmount() {
    this.unsub()
  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <AppNavigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
