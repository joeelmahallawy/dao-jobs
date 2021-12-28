import prisma from "../../lib/prisma";
import { MongoClient } from "mongodb";
export const resolvers = {
  Query: {
    // Employers: async () =>
    //   // here we could just import the model then
    //   // and do something like
    //   await prisma.employers.create({
    //     data: {
    //       discordTag: "MoreThanYourAverageJoe",
    //       ownsDao: "Anura",
    //       profilePic: "23214123", // aight sure dw
    //     },
    //   }),
    // // const employers = UserModel.await() // thats it
  },
  Mutation: {
    // addEmployer: async () =>
    //   await prisma.employers.create({
    //     data: {
    //       ownsDao: "Anura",
    //       discordTag: "MoreThanYourAverageJoe",
    //       profilePic: "yoMAMA.jpeg",
    //     },
    //   }),
  },
};

// not really

// hahaha okay so basically you create a db file first where you define
// your mongo credentials yeahhh
// and then you import that db into every model you have
// and then for instance here
