import Home from '../components/home'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'

const IndexPage = (props) => {
    return <Home />
}
export const getServerSideProps = async (ctx) => {
    const res = await fetch(`https://www.daojobz.xyz/api/stats`, {
        headers: { Cookie: ctx.req.headers.cookie },
    })
    const userData = await res.text()
    if (!userData) {
        // if user isn't logged in, redirect to auth0 login page
        return { props: {} }
    } else {
        const user = JSON.parse(userData)
        // check if user is employer
        const isEmployer: boolean = await userIsEmployer(user)

        if (isEmployer) {
            // if user is employer, redirect to employer's main page
            return { redirect: { destination: '/employerMain' } }
        } else {
            // if not employer, check if user is job seeker
            const isJobSeeker: boolean = await userIsJobSeeker(user)
            // if user is job seeker, redirect to job seeker's main page
            if (isJobSeeker) return { redirect: { destination: '/seekerMain' } }
            // otherwise, if user isn't job seeker nor employer, return normal discord auth data and have user register
            else return { redirect: { destination: '/registration' } }
        }
    }
}

export default IndexPage
