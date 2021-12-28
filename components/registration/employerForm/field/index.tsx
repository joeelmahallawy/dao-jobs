import { FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const Field = ({ children, handleChange, handleBlur, value }) => {
  return (
    <>
      <FormLabel mt="1.5rem">{children}</FormLabel>
      <Input
        outline="1px solid gray"
        _focus={{ bg: "white" }}
        placeholder={"Ex. Olympus DAO"}
        type="text"
        name=""
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
    </>
  );
};
export default Field;
