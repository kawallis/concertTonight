import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Keyboard } from 'react-native';
import { style, Input, Text, spacing, Button, Logo, color, typography, size, translate } from '../../shared'
import validate from "validate.js"
import firebase from 'firebase'
import { AuthSession } from 'expo'
import { getAuthorizationCode, getTokens } from '../../../authSpotify'

const constraints = {
	email: {
		presence: {
			allowEmpty: false
		},
		email: true
	},
	password: {
		presence: {
			allowEmpty: false
		}
	}
};

type Props = {
	navigation: any
	toggleModal: any
}

type State = {
	email: string,
	password: string,
	emailErrors: any,
	passwordErrors: any
}

const INTITAL_STATE = {
	email: 'wally@wall.com',
	password: 'Password1234',
	emailErrors: null,
	passwordErrors: null
}

export class LoginScreen extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			...INTITAL_STATE
		}
	}

	handleChange = (label: string, value: string) => {
		this.setState({
			[label]: value,
			[label + 'Errors']: null,
		})
	}

	submit = async (login) => {
		try {
			let res = validate(this.state, constraints);
			if (res) {
				this.setState({
					emailErrors: res.email,
					passwordErrors: res.password
				})
			} else {
				let response = await firebase.auth().signInWithEmailAndPassword(
					this.state.email,
					this.state.password
				)
				console.log(response)
				// if (response.res) {
				// 	this.setState({
				// 		...INTITAL_STATE
				// 	})
				// 	Keyboard.dismiss()
				// }

			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {

		return (
			<View style={styles.container}>
				<Text
					text='login.welcomeBack'
					style={{
						...typography.header_1,
						fontSize: size.largest,
						alignSelf: 'center'
					}}
					onPress={() => this.props.navigation.navigate('register')}
				/>
				<Text
					text='login.noAccount'
					style={{ ...typography.link_small, marginTop: spacing.small, marginBottom: spacing.large, alignSelf: 'center', textDecorationLine: 'underline' }}
					onPress={() => this.props.navigation.navigate('register')}
				/>
				<Input
					label={translate('login.emailAddressTitle')}
					name="email"
					errors={this.state.emailErrors}
					value={this.state.email}
					onChangeText={this.handleChange}
				/>
				<Input
					label={translate('login.passwordTitle')}
					name="password"
					errors={this.state.passwordErrors}
					value={this.state.password}
					onChangeText={this.handleChange}
				/>
				<Text
					text='login.forgotPassword'
					style={{
						...typography.link_small,
						marginBottom: spacing.large,
						alignSelf: 'flex-start',
						textDecorationLine: 'underline'
					}}
				// onPress={() => this.props.navigation.navigate('forgotPassword')}
				/>
				<Button
					size='large'
					text="login.loginButton"
					style={{ width: '100%' }}
					onPress={() => this.submit()}
				/>

				<Button
					size='large'
					text="login.spotify"
					style={{ 
						...style.shadow,
						width: '100%', marginTop: 25,
						backgroundColor: '#1DB954', borderRadius: 25,
						
					}}
					onPress={() => getTokens()}
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
