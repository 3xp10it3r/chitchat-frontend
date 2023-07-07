import { HStack, IconButton, Text } from "native-base";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";
import { MenuList } from "./MenuList";

const SidebarHeader = () => {
  return (
    <HStack justifyContent={"space-between"} p={2} alignItems={"center"}>
      <Text fontSize={24} bold>
        ChitChat
      </Text>
      <HStack alignContent={"center"} space={2}>
        <IconButton
          icon={<HiPlusCircle size={25} />}
          _dark={{
            color: "white",
          }}
          _light={{
            color: "black",
          }}
          borderRadius="50"
        ></IconButton>
        <MenuList color="white" />
      </HStack>
    </HStack>
  );
};

export default SidebarHeader;
