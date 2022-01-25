import prisma from '../../lib/prisma'

const handler = async (req, res) => {
    const data = await prisma.jobPosting.findMany({
        include: {
            workFor: {
                select: {
                    nameOfDao: true,
                },
            },
        },
        // include: {
        //     workFor: {
        //         include: {
        //             ownedBy: true,
        //         },
        //     },
        // },
    })
    res.json(data)
}
export default handler
