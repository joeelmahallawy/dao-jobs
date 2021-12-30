import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

export const config = {
    api: {
        bodyParser: true,
        sizeLimit: '5000mb', // im not getting the eeorr
    },
}
const handler = async (req, res) => {
    // console.log(req)
    console.log(req.files)
    res.json({ 'fucku ': 'nextjs' })
}

// okay it works now

// const handler = nextConnect()
// handler.use(middleware)

// handler.post(async (req: any, res: NextApiResponse) => {
//     console.log(req.files)

//     //const body = JSON.parse(req.body)
// })

// the reason why it keeps loading is because the backend is not sending a response so we have to return something

export default handler
