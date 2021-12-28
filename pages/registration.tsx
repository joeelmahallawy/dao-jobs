import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { theme } from "../utils/theme";

const RegistrationPage = () => {
  return (
    <Center flexDir="column" p="5%">
      <Flex gap="2rem" flexDir="column">
        <Heading
          fontWeight="500"
          fontSize={["1rem", "1.25rem", "1.5rem", "2rem", "2.5rem"]}
        >
          <span style={{ color: theme.colors.PrimaryBlue }}>Are</span> you a an
          employer or a job-seeker?
        </Heading>

        <Flex p={3} gap="1rem" justifyContent="space-around">
          <Button
            p={["1rem", "1.25rem", "1.5rem", "1.75rem", "2rem"]}
            fontSize={["1rem", "1.25rem", "1.5rem", "1.75rem", "2rem"]}
            colorScheme="linkedin"
            fontFamily="Arial"
          >
            Employer
          </Button>
          <Button
            p={["1rem", "1.25rem", "1.5rem", "1.75rem", "2rem"]}
            fontSize={["1rem", "1.25rem", "1.5rem", "1.75rem", "2rem"]}
            colorScheme="green"
            fontFamily="Arial"
          >
            Job seeker
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};
export default RegistrationPage;
