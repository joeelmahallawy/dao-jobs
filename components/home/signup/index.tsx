import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import backgroundImage from "../../../attachments/signup-bg.png";
import { theme } from "../../../utils/theme";
import SignUpButton from "../../reusables/signUpButton";

const SignUp = () => {
  return (
    <Center
      p="5%"
      gap="5rem"
      display={["block", "block", "block", "flex", "flex"]}
    >
      <Image
        m={["auto", "auto", "auto", "0", "0"]}
        w={["80%", "80%", "80%", "40%", "30%"]}
        src={backgroundImage.src}
      />
      <Center flexDir="column" w={["100%", "100%", "100%", "55%", "45%"]} p={3}>
        <Heading
          m={["auto", "auto", "auto", "0", "0"]}
          p={3}
          fontSize={[
            "1.25rem",
            "1.25rem",
            "1.75rem",
            "1.75rem",
            "2.25rem",
            "3rem",
          ]}
          fontWeight="500"
        >
          <span
            style={{
              color: theme.colors.PrimaryBlue,
              fontWeight: "bold",
            }}
          >
            {" "}
            Signup now{" "}
          </span>
          to post up job listings, or to start working in DeFi!
          <br />
        </Heading>
        <Box mt="1rem" mr={["0", "0", "0", "auto", "auto"]}>
          <SignUpButton />
        </Box>
      </Center>
    </Center>
  );
};
export default SignUp;
