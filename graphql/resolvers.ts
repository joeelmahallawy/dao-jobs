import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    Employers: async () => await prisma.employers.findFirst(),
  },
  Mutation: {
    addEmployer: async () =>
      await prisma.employers.create({
        data: {
          ownsDao: "Anura",
          discordTag: "MoreThanYourAverageJoe",
          profilePic: "yoMAMA.jpeg",
        },
      }),
  },
};
