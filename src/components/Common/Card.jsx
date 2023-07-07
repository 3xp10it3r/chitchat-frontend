import { Avatar, Box, HStack, Text, VStack } from "native-base";
import React from "react";

const Card = ({ name, display_name, last_message, unseen_count, image }) => {
  return (
    <HStack
      space={4}
      p={2}
      w={"100%"}
      bg="linear-gradient(to right,#007AFE, #007BAA)"
    >
      <Avatar ml={2} source={{ uri: image }}>
        {/* <Avatar.Badge bg="green.500" /> */}
      </Avatar>
      <VStack w={"50%"}>
        <Text bold fontSize={16}>
          {display_name !== undefined
            ? display_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )
            : name.slice(0, 8)}
        </Text>
        <Text isTruncated color={"coolGray.300"}>
          {last_message?.message}
        </Text>
      </VStack>
      <HStack alignItems={"center"} w={"15%"}>
        <Box
          w={"5"}
          h={"5"}
          borderRadius={"10"}
          alignItems={"center"}
          justifyContent={"center"}
          bgColor="white"
        >
          <Text bold color={"blue.700"}>
            {unseen_count}
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
};

export default Card;
