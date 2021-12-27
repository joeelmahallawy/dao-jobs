import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    Users: async () =>
      await prisma.user.findFirst({
        where: {
          firstName: "Youssef",
        },
      }),
  },
  Mutation: {},
};
