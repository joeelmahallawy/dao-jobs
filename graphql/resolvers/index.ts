import prisma from "../../lib/prisma";
import { MongoClient } from "mongodb";
export const resolvers = {
  Query: {
    Employers: async () =>
      await prisma.employers.create({
        data: {
          discordTag: "MoreThanYourAverageJoe",
          ownsDao: "Anura",
          profilePic: "23214123",
        },
      }),
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
