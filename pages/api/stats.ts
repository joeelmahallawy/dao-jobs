import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default withApiAuthRequired(async function ProtectedRoute(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // const session = aw   zait supabase.auth.session()
        const session = await getSession(req, res)
        const user = await session.user
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ err })
    }
})
