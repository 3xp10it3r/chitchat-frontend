import axios from "../../Api/axios";
import { css } from "@emotion/css";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import Picker from "emoji-picker-react";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { AiFillSmile, AiOutlinePaperClip } from "react-icons/ai";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { useUserAuth } from "../../context/UserAuthContext";
import ScrollToBottom from "react-scroll-to-bottom";
import SendImageMessage from "./SendImageMessage";

const Chat = ({
  width,
  height,
  messages,
  name,
  display_name,
  last_seen,
  image,
}) => {
  const [typedMessage, setTypedMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);

  const { user } = useUserAuth();
  // const [chosenEmoji, setChosenEmoji] = useState(null);

  const ROOT_CSS = css({
    height: width.length !== 4 ? "83%" : "80%",
    width: "100%",
  });
  const onEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject);
    // setChosenEmoji(emojiObject);
    setTypedMessage(typedMessage + " " + emojiObject?.emoji + " ");
    // setChosenEmoji(null);
    // console.log(chosenEmoji);
    setShowEmojis(!showEmojis);
  };

  const sendMessage = async () => {
    await axios.post("/messages/new", {
      message: typedMessage,
      name: user.uid,
      to: name,
      timestamp: new Date().toLocaleString(),
      received: false,
    });
    console.log("send");
    setTypedMessage("");
    setShowEmojis(false);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <>
      <Box w={width} h={height !== undefined ? "74vh" : "80vh"}>
        <HStack
          h={width.length !== 4 ? "10%" : "12%"}
          alignItems={"center"}
          px={2}
          shadow="5"
          py={width.length !== 4 ? "0px" : "5px"}
          borderTopRightRadius={width.length !== 4 ? "30" : "0"}
        >
          <Avatar source={{ uri: image }}></Avatar>
          <VStack pl={2}>
            <Text bold color={"black"}>
              {display_name !== undefined
                ? display_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )
                : height !== undefined
                ? name?.slice(0, 20)
                : name}
            </Text>
            <Text color={"coolGray.500"}>{last_seen}</Text>
          </VStack>
        </HStack>
        {showImgModal && (
          <SendImageMessage
            showImgModal={showImgModal}
            setShowImgModal={setShowImgModal}
            name={name}
          />
        )}
        <ScrollToBottom className={ROOT_CSS} initialScrollBehavior="smooth">
          {messages.map((message, i) => (
            <div key={i}>
              {message.name === user.uid && message.to === name && (
                <Box alignItems={"flex-end"} m={2}>
                  <Text
                    style={{
                      background: "linear-gradient(to right, #007BAA, #007AFE)",
                    }}
                    p={3}
                    borderRadius="10"
                    borderBottomRightRadius={"0"}
                    mr={2}
                    fontWeight="400"
                  >
                    <VStack>
                      {message.message.length < 1500 ? (
                        <Text>{message.message}</Text>
                      ) : (
                        <Image
                          source={{ uri: message.message }}
                          alt="Alternate Text"
                          size="xl"
                        ></Image>
                      )}
                    </VStack>
                  </Text>
                  <Text
                    fontWeight={"hairline"}
                    fontSize="10"
                    color={"black"}
                    mr={1}
                  >
                    {message.timestamp}
                  </Text>
                </Box>
              )}
              {message.name !== user.uid &&
                message.to === user.uid &&
                message.name === name && (
                  <Box marginLeft={"auto"} alignItems={"flex-start"} m={2}>
                    <Box
                      style={{
                        background:
                          "linear-gradient(to right, #007BAA, #007AFE)",
                      }}
                      p={3}
                      borderRadius="10"
                      borderTopLeftRadius={"0"}
                      ml={2}
                      fontWeight="400"
                    >
                      <VStack>
                        {message.message.length < 1500 ? (
                          <Text>{message.message}</Text>
                        ) : (
                          <Image
                            source={{ uri: message.message }}
                            alt="Alternate Text"
                            size="xl"
                          ></Image>
                        )}
                      </VStack>
                    </Box>
                    <Text
                      fontWeight={"hairline"}
                      fontSize="10"
                      color={"black"}
                      ml={1}
                    >
                      {message.timestamp}
                    </Text>
                  </Box>
                )}
            </div>
          ))}
        </ScrollToBottom>
        {showEmojis && (
          <Box height={"30vh"} ml={1} position={"absolute"} bottom={10}>
            <Picker onEmojiClick={onEmojiClick} />
          </Box>
          // <Box
          //   position={"absolute"}
          //   bottom={10}
          //   mx={2}
          //   width={"38.5%"}
          //   height={"40%"}
          //   // overflowX={"hidden"}
          //   overflow="hidden"
          //   borderBottomWidth={5}
          //   borderBottomRadius={10}
          // >
          //   {/* <Picker
          //     data={data}
          //     perLine={height !== undefined ? 8 : 8}
          //     emojiSize={20}
          //     emojiButtonSize={32}
          //     maxFrequentRows={1}
          //     previewPosition="none"
          //     categories={[
          //       "frequent",
          //       "people",

          //       "foods",
          //       "activity",

          //       "symbols",
          //     ]}
          //   /> */}
          // </Box>
        )}
        <Box position={"absolute"} bottom="0" left={"0"} w={"100%"}>
          <HStack>
            <Input
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              leftElement={
                <IconButton
                  ml={2}
                  p={0}
                  onPressIn={() => setShowEmojis(!showEmojis)}
                  icon={<AiFillSmile size={25} />}
                  color="coolGray.500"
                  borderRadius="50"
                ></IconButton>
              }
              autoFocus={true}
              w={"100%"}
              variant="unstyled"
              alignSelf="center"
              placeholder="Type your message here..."
              placeholderTextColor={"coolGray.500"}
              // borderColor="#007AFE"
              bgColor={"coolGray.300"}
              // border="none"
              onKeyPress={handleKeypress}
              color={"coolGray.500"}
              focusOutlineColor="none"
              fontSize={"md"}
              rightElement={
                <HStack space={3}>
                  <IconButton
                    ml={2}
                    p={0}
                    icon={<AiOutlinePaperClip size={25} />}
                    color="coolGray.500"
                    borderRadius="50"
                    _pressed={{
                      color: "blue.900",
                    }}
                    onPressIn={() => setShowImgModal(!showImgModal)}
                  ></IconButton>
                  <IconButton
                    mr={4}
                    p={2}
                    bg={"#007AFE"}
                    icon={<IoPaperPlaneSharp size={16} p={1} />}
                    _pressed={{
                      bg: "blue.900",
                    }}
                    _hover={{
                      bg: "blue.600",
                    }}
                    color="white"
                    borderRadius="40"
                    onTouchStart={sendMessage}
                    // onPressIn={sendMessage}
                    // onPress={sendMessage}
                    // onClick={sendMessage}
                    // onMagicTap={sendMessage}
                    // onHoverIn={sendMessage}
                    onPress={sendMessage}
                  ></IconButton>
                </HStack>
              }
            />
          </HStack>
        </Box>
      </Box>
      {/* <Box>
        <text>
          How are the best things happens?
          <div>
            <header></header>
          </div>
        </text>
      </Box> */}
    </>
  );
};

export default Chat;
