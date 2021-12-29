// import { useAsync, useAsyncFn } from 'react-use'

// const [user, fetchUser] = useAsyncFn(async (code: string) => {
//     const response = await fetch(
//         // get access token
//         'http://localhost:3000/api/discordAuth',
//         {
//             method: 'POST',
//             body: JSON.stringify({
//                 code,
//             }),
//         },
//     )
//     const { data } = await response.json()
//     // store access token into localStorage
//     localStorage.setItem('access-token', data)

//     // get user with access token
//     const ajaxRes = await fetch(
//         `http://discordapp.com/api/oauth2/@me?access_token=${data.access_token}`,
//         {
//             headers: {
//                 Authorization: `${data.token_type} ${data.access_token}`,
//             },
//         },
//     )
//     if (!ajaxRes.ok)
//         throw new Error('Could not get user data with access token')
//     const { user } = await ajaxRes.json()
//     return user
// }, [])
// export default fetchUser
