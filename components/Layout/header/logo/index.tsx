import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { theme } from "../../../../utils/theme";

const Logo = () => {
  const router = useRouter();
  return (
    <Box w="33%" _hover={{ cursor: "pointer" }}>
      <Link
        href={
          router.pathname == "/registration"
            ? router.pathname
            : "http://localhost:3000/"
        }
      >
        <Flex>
          <Heading
            fontWeight="500"
            fontSize={["0.75rem", "1.75rem", "2.75rem", "3.5rem", "4.25rem"]}
          >
            Dao
          </Heading>
          <Heading
            fontWeight="800"
            fontSize={["0.75rem", "1.75rem", "2.75rem", "3.5rem", "4.25rem"]}
            fontFamily="Poppins"
            color={theme.colors.PrimaryBlue}
          >
            Jobs
          </Heading>
        </Flex>
      </Link>
    </Box>
  );
};
export default Logo;
