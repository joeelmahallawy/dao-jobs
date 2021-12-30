import { Heading } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { userData } from '../recoil'

const EmployerMainPage = () => {
    const [user, setUser] = useRecoilState(userData)
    console.log(user)
    return user ? (
        <Heading>the beginning of employers main page</Heading>
    ) : (
        <Heading>Your not loggged in</Heading>
    )
}
export default EmployerMainPage
