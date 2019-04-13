import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';

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

        console.log(result)
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
        console.log('RESSSS', result)
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
        const refreshToken = await getUserData('refreshToken');
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
            await setUserData('accessToken', newAccessToken);
            if (newRefreshToken) {
                await setUserData('refreshToken', newRefreshToken);
            }
            await setUserData('expirationTime', expirationTime);
        }
    } catch (err) {
        console.error(err)
    }

}