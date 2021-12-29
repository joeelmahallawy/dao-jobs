import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
export default handler
