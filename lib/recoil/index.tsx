import { createGlobalState } from 'react-use'
import { atom, selector } from 'recoil'

const userData = atom({
    key: 'userData',
    default: null,
})

export { userData }
