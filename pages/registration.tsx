import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { NextPageContext } from "next";

import React, { useState } from "react";

import Registration from "../components/registration";

const RegistrationPage = ({ user }) => {
  return (
    <Box>
      <Registration user={user} />
    </Box>
  );
};
export const getServerSideProps = async (ctx: NextPageContext) => {
  // Get user access token with auth code
  if (!ctx.query.code) {
    return {
      redirect: {
        destination:
          "https://discord.com/api/oauth2/authorize?client_id=924466427895889941&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregistration&response_type=code&scope=identify",
        permanent: false,
      },
    };
  }
  // Get user data with access token
  const response = await fetch("http://localhost:3000/api/discordAuth", {
    method: "POST",
    body: JSON.stringify({
      code: ctx.query.code,
    }),
  });
  const user = await response.json();
  // check if access token works, if not, reauthenticate
  if ("err" in user)
    return {
      redirect: {
        destination: "http://localhost:3000/registration",
        permanent: true,
      },
    };
  // return user data
  return {
    props: {
      user,
    },
  };
};

export default RegistrationPage;
