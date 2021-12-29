import { createGlobalState } from 'react-use'
import { atom, selector } from 'recoil'

const userData = atom({
    key: 'userData',
    default: {},
})
// const getUserData = selector({
//     key: 'getUserData',
//     get: async ({ get }) => {
//         const accessToken = localStorage.getItem('access_token')
//         const userResponse = await fetch(
//             `http://discordapp.com/api/oauth2/@me?access_token=${accessToken}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             },
//         )
//         const data = await userResponse.json()

//         const user = get(data)
//         return user
//     },
// })
const useGlobalUser = createGlobalState<object>({})
export { userData, useGlobalUser }
