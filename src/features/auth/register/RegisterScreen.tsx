import React, { Component } from 'react';
import { View, Keyboard, ScrollView, Image, Alert } from 'react-native';
import { Input, Text, size, typography, spacing, Button, color, translate } from '../../../shared'
import { Props, State, INTITAL_STATE } from './data'
import { styles } from './styles'
import { constraints } from './constraints'
import validate from "validate.js"
import firebase from 'firebase'

export class RegisterScreen extends Component<Props, State> {
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

  submit = async (register) => {
    try {
      let res = validate(this.state, constraints);
      if (res) {
        this.setState({
          firstNameErrors: res.firstName,
          lastNameErrors: res.lastName,
          emailErrors: res.email,
          passwordErrors: res.password,
        })
      } else {
        let response = await firebase.auth().createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        )

        if (response) {
          Keyboard.dismiss()

          this.setState({
            ...INTITAL_STATE
          })
        }
      }
    } catch (e) {
      console.log("AHHH", e)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          text='login.welcome'
          style={{
            ...typography.header_1,
            fontSize: size.largest,
            alignSelf: 'center'
          }}
          onPress={() => this.props.navigation.navigate('register')}
        />
        <Text
          text='register.alreadyHaveAccount'
          style={{ ...typography.link_small, marginTop: spacing.small, marginBottom: spacing.large, alignSelf: 'center', textDecorationLine: 'underline' }}
          onPress={() => this.props.navigation.goBack(null)}
        />
        <Input
          label={translate('login.firstNameTitle')}
          name="firstName"
          value={this.state.firstName}
          errors={this.state.firstNameErrors}
          onChangeText={this.handleChange}
        />
        <Input
          label={translate('login.lastNameTitle')}
          name="lastName"
          value={this.state.lastName}
          errors={this.state.lastNameErrors}
          onChangeText={this.handleChange}
        />
        <Input
          label={translate('login.emailAddressTitle')}
          name="email"
          value={this.state.email}
          errors={this.state.emailErrors}
          onChangeText={this.handleChange}
        />
        <Input
          label={translate('login.passwordTitle')}
          name="password"
          value={this.state.password}
          errors={this.state.passwordErrors}
          onChangeText={this.handleChange}
          containerStyle={{ marginBottom: 5 }}

        />
        <Text
          text="register.password"
          style={{ textAlign: 'center', fontSize: 12, marginBottom: 15 }}
        />

        <Button
          size='large'
          text="register.submitButton"
          style={{ width: '100%' }}
          onPress={() => this.submit()}
        />
      </ScrollView>
    );

  }
}
