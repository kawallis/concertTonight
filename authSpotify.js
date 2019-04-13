import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { AsyncStorage } from 'react-native'
import firebase from 'firebase'
const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');


// https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0

export const getAuthorizationCode = async () => {
    try {
        const spotifyCredentials = {
            clientId: '13b69baaeddb410cb4887e521450ce45',
            clientSecret: '736118a51bc148fdbcdd862820891019',
        }
        const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
        console.log('REDIRECT', redirectUrl)
        
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                spotifyCredentials.clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl),
        })

        console.log("AUTHORIZATIONCODE", result)
        return result.params.code

    } catch (err) {
        console.error(err)
    }
}


export const getTokens = async () => {
    try {
        const authorizationCode = await getAuthorizationCode() //we wrote this function above
        const credentials = {
            clientId: '13b69baaeddb410cb4887e521450ce45',
            clientSecret: '736118a51bc148fdbcdd862820891019',
            redirectUri: 'https://auth.expo.io/@kawallis/your'
        } //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri
                }`,
        });
        let result = await response.json();


        await AsyncStorage.setItem('accessToken', result.access_token);
        await AsyncStorage.setItem('refreshToken', result.refresh_token);
        const expirationTime = new Date().getTime() + result.expires_in * 1000;

        await AsyncStorage.setItem('expirationTime', expirationTime.toString());


        let res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${result.access_token}`
            }
        })

        let userInfo = await res.json()
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        let token = await fetch('https://v88wb2hjx8.execute-api.us-west-2.amazonaws.com/dev/createFirebaseToken', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                spotifyID: userInfo.id
            }), // body data type must match "Content-Type" header
        })

        let customToken = await token.json()

        console.log(userInfo)
        console.log(customToken)

        // {
        //     "access_token": "BQB-_j0zQ9WiS_FUZt0kOfJgcBwYh5zTk4NkvY1pTktPdF_WCciEGXR3U2qzF0Uy0uc1pqTtNhR6YMfGfAHcJpRCZZlg0oPJdPSSz-fCVe0UEVk2XNYn2UxHtuMw2_DC00DnGVuaAMpiG7Xw0mjIv4ygYnvuqNiIGWdo5EOnCjKHdLEQ2tSzsp4-yAEZyPwguQR2LrqFdTm0BoUeWafnjCTqeReGGzA7N9wwOYxKB9_A29qAsxGzdLmt",
        //     "expires_in": 3600,
        //     "refresh_token": "AQCugp1dwf7LUMw2kK4ODe4Q6HVDjc6gFaNype2_BO1TQ7TEjoTCCP8RG0vXE2QWMyjOR6a6oEP8Vrf5kAlkBTASQc2jmtZk4mevIzrcxFsp40ZDwwpipJX76dinv_tpNTdr8A",
        //     "scope": "playlist-read-private playlist-read-collaborative user-modify-playback-state user-library-read user-library-modify playlist-modify-private playlist-modify-public user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read",
        //     "token_type": "Bearer",
        //   }
        let firebaseRes = await firebase.auth().signInWithCustomToken(customToken)
        console.log(firebaseRes)

        return result
    } catch(err){
        console.error(err);
    }
}

export const refreshTokens = async () => {
    try {
        const credentials = {
            clientId: '13b69baaeddb410cb4887e521450ce45',
            clientSecret: '736118a51bc148fdbcdd862820891019',
        } //we wrote this function above
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) {
            await getTokens();
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await AsyncStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
            }
            await AsyncStorage.setItem('expirationTime', expirationTime);
        }
    } catch (err) {
        console.error(err)
    }

}