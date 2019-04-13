import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Keyboard, Dimensions } from 'react-native';
import { Button, color } from '../../shared'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'
import Expo from 'expo'
let window = Dimensions.get('window');
const contentHeight = window.height - 80;
const avatarBot = "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg";

type Props = {}
type State = {}

export class ChatScreen extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            gifted: [],
            answers: [],
            height: contentHeight,
            user: null,
        }
    }

    async componentDidMount() {
        console.log(firebase.auth().currentUser.uid)
        let doc = await firebase.firestore()
            .collection("Users")
            .doc(firebase.auth().currentUser.uid).get()
        if (doc.exists) {
            let image = (doc.data().profileImage && doc.data().profileImage[0]) ? doc.data().profileImage[0].url : ''
            this.setState({
                user: {
                    image: image,
                    name: doc.data().name
                }
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        Expo.Speech.stop();
    }

    _keyboardDidShow = (e) => {
        this.setState({ height: contentHeight - e.endCoordinates.height });
        // console.log(this.state.contentHeight, 'Keyboard Shown');
    }

    _keyboardDidHide = (e) => {
        this.setState({ height: contentHeight });
        // console.log(this.state.contentHeight, 'Keyboard Hidden');
    }

    componentWillMount() {
        this.setState({
            gifted: [
                {
                    _id: 1,
                    text: 'Hi! My name is Jack! I am the digital assistant for ConcertTonight!',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Botler',
                        avatar: avatarBot,
                    },
                },
            ],
        })
    }

    getDialogFlow = async (msg) => {
        const ACCESS_TOKEN = 'd59e8b8116574f3888d95f358ca51809';
        try {
            const response = await fetch(`https://api.dialogflow.com/v1/query?v=20170712`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify({
                    query: msg,
                    lang: 'en',
                    sessionId: 'somerandomthing'
                })
            })
            let responseJson = await response.json();
            console.log('RESPONSE', responseJson)
            const imageUrl = null;

            responseJson.result.fulfillment.messages.map((item, i) => {
                if (item.payload !== undefined) {
                    if (item.payload.imageUrl !== undefined) {
                        imageUrl = item.payload.imageUrl;
                    }
                }
                return imageUrl
            })

            let answers = [
                {
                    _id: responseJson.id,
                    text: responseJson.result.fulfillment.speech,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Botler',
                        avatar: avatarBot,
                    },
                    image: imageUrl,
                    imageProps: {
                        height: 200,
                        width: 200
                    }
                },
            ]

            // Expo.Speech.stop()
            // Expo.Speech.speak(responseJson.result.fulfillment.speech)

            this.setState(previousState => ({
                gifted: GiftedChat.append(previousState.gifted, answers),
            }))

            return responseJson;

        } catch (error) {
            console.error(error);
        }
    }

    onSend(messages = []) {
        console.log(messages)
        this.setState(previousState => ({
            gifted: GiftedChat.append(previousState.gifted, messages),
        }))
        this.getDialogFlow(messages[0].text)
    }

    renderChat = () => {
        return (
            <GiftedChat
                textInputProps={{ autoFocus: true }}
                messages={this.state.gifted}
                placeholder='Ask me anything...'
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        );
    }

    render() {

        return (
            <View style={{
                height: this.state.height,
                backgroundColor: color.offWhite,
                marginBottom: 15,
                paddingBottom: 15,

            }}>
                {this.renderChat()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.offWhite,
    },
});