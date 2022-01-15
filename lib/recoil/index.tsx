import { atom } from 'recoil'

const globalUser = atom({
    key: 'globalUser',
    default: null,
})

export { globalUser }
