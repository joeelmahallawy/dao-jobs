import DiscordOauth2 from 'discord-oauth2'
import { get } from 'https'

const getSessionTokens = (router, setUser) => {
    const oauth = new DiscordOauth2()
    if (router.query.code) {
        // get user tokens through oauth2
        oauth
            .tokenRequest({
                clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
                clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
                code: router.query.code,
                scope: 'identify',
                grantType: 'authorization_code',
                redirectUri: process.env.NEXT_PUBLIC_DISCORD_CLIENT_REDIRECT,
            })
            .then((res) => {
                // save token to localStorage
                localStorage.setItem('tokens', JSON.stringify(res))
                // get user with access token
                oauth.getUser(res.access_token).then((res) => setUser(res))
            })
    }
}

export default getSessionTokens
