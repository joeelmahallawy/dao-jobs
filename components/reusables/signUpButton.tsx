import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { theme } from "../../utils/theme";

const SignUpButton = () => {
  const router = useRouter();

  return router.pathname == "/registration" ? (
    <>
      <Heading
        fontWeight="500"
        fontSize={["0.6rem", "0.9rem", "1.25rem", "1.75rem", "2rem"]}
      >
        <span
          style={{
            color: theme.colors.PrimaryBlue,
            fontWeight: "bold",
          }}
        >
          You
        </span>{" "}
        are signing up
      </Heading>
    </>
  ) : (
    <>
      <Link href="https://discord.com/api/oauth2/authorize?client_id=924466427895889941&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregistration&response_type=code&scope=identify">
        <Button
          borderRadius="10"
          fontFamily="Arial"
          _focus={{}}
          size="lg"
          p={["1rem", "1rem", "1.25rem", "1.5rem", "2rem"]}
          fontSize={["1rem", "1.25rem", "1.5rem", "1.75rem", "2rem"]}
          colorScheme="linkedin"
        >
          Signup
        </Button>
      </Link>
    </>
  );
};

export default SignUpButton;
