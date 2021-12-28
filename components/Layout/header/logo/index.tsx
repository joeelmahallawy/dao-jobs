import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { theme } from "../../../../utils/theme";

const Logo = () => {
  return (
    <Flex w="33%">
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
  );
};
export default Logo;
