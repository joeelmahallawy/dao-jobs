import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // if user exists, then returns object with session and user object
        const { user } = getSession(req, res)
        res.status(200).json(user)
        // returns null if there's no user session
    } catch (err) {
        res.status(400).json(null)
    }
}
export default handler
