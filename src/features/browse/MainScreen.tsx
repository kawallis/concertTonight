import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Keyboard } from 'react-native';
import { Button, color } from '../../shared'
import firebase from 'firebase'

type Props = {

}

type State = {

}

export class MainScreen extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {

		}
	}



	render() {

		return (
			<View style={styles.container}>
				<Button
					size='large'
					text="settingsHome.logOutLink"
					style={{ width: '100%' }}
					onPress={() => firebase.auth().signOut()}
				/>
			</View>
		)

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.offWhite,
		padding: 20
	},
});
