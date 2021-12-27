import { Button, FormControl, Input } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Router from "next/router";

const IndexPage = () => {
  return (
    <>
      <Button
        onClick={async () => {
          const res = await fetch("/api/discordAuth", {
            method: "POST",
            body: JSON.stringify({
              code: Router.query.code,
            }),
          });
          const data = await res.json();
          console.log("THIS IS THE USER", data);
        }}
      >
        Click to send data
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch("/api/graphql");
          const data = await res.json();
          console.log(data);
        }}
      >
        Hit the endpoint
      </Button>
      <Link href="https://discord.com/api/oauth2/authorize?client_id=924466427895889941&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify">
        Nice
      </Link>
    </>
  );
};
export default IndexPage;
