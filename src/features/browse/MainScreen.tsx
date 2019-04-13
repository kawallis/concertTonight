import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Keyboard } from 'react-native';
import { Button, color } from '../../shared'


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
					text="login.loginButton"
					style={{ width: '100%' }}
					// onPress={() => this.submit()}
				/>

			</View>
		)

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: color.offWhite,
		padding: 20
	},
});
