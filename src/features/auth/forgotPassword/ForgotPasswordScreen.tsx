import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Text, Button, Logo, translate } from '../../../shared'
import { constraints } from './contraints'
import { styles } from './styles'
import validate from "validate.js"

const INTITAL_STATE = {
	email: '',
	emailErrors: null,
}

type MyForgotPasswordProps = {
	modalStore: any
    userStore: any
    navigation: any
}

type MyForgotPasswordState = {
	email: string
	emailErrors: any
}

export class ForgotPasswordScreen extends Component<MyForgotPasswordProps, MyForgotPasswordState> {
	constructor(props) {
		super(props)
		this.state = {
			...INTITAL_STATE
		}
	}

	handleChange = (label, value) => {
		this.setState({
			[label]: value,
			[label + 'Errors']: null,
		})
	}

	submit = async () => {
		try {
			let res = validate(this.state, constraints);
			if (res) {
				this.setState({
					emailErrors: res.email,
				})
			} else {
				// let response = await this.props.userStore.forgotPassword(this.state.email)
				if (response.ok) {
					
					this.setState({
						email: ''
					})
				} else {
					
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Logo />
				<Input
					label="email"
					name="email"
					style={{ marginVertical: 20 }}
					errors={this.state.emailErrors}
					value={this.state.email}
					onChangeText={this.handleChange}
				/>
				<Button
					text="forgotPassword.sendButton"
					style={{}}
					textStyle={{}}
					onPress={() => this.submit()}
				/>
				<Text
					text='forgotPassword.goBack'
					style={styles.goBack}
					onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}