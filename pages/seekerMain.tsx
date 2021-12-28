import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import { request, gql } from "graphql-request";

const SeekerHomePage = () => {
  return (
    <>
      <Button
        onClick={async () => {
          //   const query = gql`
          //     query {
          //       Employers {
          //         discordTag
          //         id
          //         ownsDao
          //         profilePic
          //       }
          //     }
          //   `;
          //   request("http://localhost:3000/api/graphql", query).then(
          //     ({ Employers }) => console.log(Employers)
          //   );
        }}
      >
        Click for data
      </Button>
      <Heading>This is the job seekers main paige</Heading>
    </>
  );
};
export default SeekerHomePage;
