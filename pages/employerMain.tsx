import { Heading } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { userData } from '../lib/recoil'
import { supabase } from '../lib/supabase'

const EmployerMainPage = (props) => {
    console.log('propsss', props)

    // if(!props.user){

    // }

    return props.user ? (
        <Heading>the beginning of employers main page</Heading>
    ) : (
        <Heading>Your not loggged in</Heading>
    )
}
export const getServerSideProps = async ({ req }) => {
    const user = await supabase.auth.api.getUserByCookie(req)
    if (!user.user)
        return {
            props: {},
            redirect: { destination: '/seekerMain' },
        }
    else return { props: { user } }
}

export default EmployerMainPage
