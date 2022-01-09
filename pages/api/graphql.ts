import ApollerServer, { ApolloServer, gql } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'micro-cors'

import { typeDefs } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'

const cors = Cors()

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})
const startServer = apolloServer.start()

export default cors(async function handler(req: NextApiRequest, res) {
    if (req.method == 'OPTIONS') {
        res.end()
        return false
    }
    await startServer
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}
