import React from "react";
import { Box, useColorMode } from "native-base";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      w="100vw"
      h="100vh"
      alignItems="center"
      bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
    >
      {children}
    </Box>
  );
};

export default Container;
