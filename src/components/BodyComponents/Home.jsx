import {
  Container,
  VStack,
  HStack,
  Text,
  Box,
  Pressable,
  Hidden,
  Icon,
  HamburgerIcon,
  Input,
  SearchIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import Card from "../Common/Card";

import Chat from "./Chat";
import { MenuList } from "./MenuList";
import SidebarHeader from "./SidebarHeader";

import Pusher from "pusher-js";
import axios from "../../Api/axios";
import { useUserAuth } from "../../context/UserAuthContext";

function Home() {
  const { user } = useUserAuth();
  const [hide, setHide] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  const [selectedUserData, setSelectedUserData] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("92535eb2d8c741dfd29c", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher("92535eb2d8c741dfd29c", {
      cluster: "ap2",
    });

    const channel1 = pusher.subscribe("users");

    channel1.bind("inserted", (newUser) => {
      setUserList([...userList, newUser]);
    });
    channel1.bind("updated", (userUpdate) => {
      // alert(JSON.stringify(userUpdate));
      let updatedUserList = userList.map((u) => {
        if (u.userid === user.uid) {
          return {
            ...u,
            username: userUpdate?.username,
            image: userUpdate?.image,
          };
        } else {
          return u;
        }
      });
      append(updatedUserList);
    });

    return () => {
      channel1.unbind_all();
      channel1.unsubscribe();
    };
    // eslint-disable-next-line
  }, [userList]);

  const append = (ul) => {
    setUserList(ul);
    setUsers();
  };

  const addUser = async () => {
    await axios.post("/user/new", {
      userid: user.uid,
    });
  };

  const setUsers = async () => {
    await axios.get("/users/sync").then((response) => {
      setUserList(response.data);
    });
  };

  useEffect(() => {
    setUsers();
  }, []);

  useEffect(() => {
    if (userList.length) {
      const found = userList.some((u) => u.userid === user.uid);
      if (!found) {
        console.log("Notfound");
        addUser();
      }
    }
    // eslint-disable-next-line
  }, [userList]);

  const setData = (name, display_name, last_seen, image) => {
    setSelectedUserData({
      name: name,
      display_name: display_name,
      last_seen: last_seen,
      image: image,
    });
    setHide(!hide);
  };

  useEffect(() => {
    const unique = userList.filter(
      (v, i, a) => a.findIndex((v2) => v2.userid === v.userid) === i
    );
    setUserList(unique);
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      // alignContent={"center"}
      alignItems="center"
      style={{
        // background: "linear-gradient(to right, #7474bf, #348ac7)",
        background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
      }}
    >
      <Container
        m={"5%"}
        w={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
        bgColor="coolGray.200"
        // style={{
        //   // background: "linear-gradient(to right, #a7bfe8, #6190e8)",
        //   // background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        //   background: "linear-gradient(to right, #83a4d4, #b6fbff)",
        // }}
        borderRightRadius={"30"}
        borderLeftRadius={"20"}
        shadow={"7"}
      >
        <HStack h={"80vh"} w={"100%"}>
          <Hidden from="md">
            <Box
              borderColor={"red.300"}
              h={"100%"}
              w={"100%"}
              borderTopLeftRadius={"20"}
              borderTopRightRadius="20"
            >
              <Box
                bgColor={"blue.300"}
                h={"6vh"}
                w={"100%"}
                borderTopLeftRadius={"20"}
                borderTopRightRadius="20"
                justifyContent="center"
              >
                <HStack justifyContent={"space-between"} mx={3}>
                  <Pressable onPress={() => setHide(!hide)}>
                    <Icon size={4} p={2}>
                      <HamburgerIcon color="black" />
                    </Icon>
                  </Pressable>

                  <Text fontSize={20} bold color={"black"}>
                    ChitChat
                  </Text>

                  <MenuList color="black" />
                </HStack>
              </Box>

              {hide === false ? (
                <VStack
                  borderBottomRadius={"20"}
                  w={"100%"}
                  h={"74vh"}
                  shadow={"1"}
                  style={{
                    background: "linear-gradient(to right, #007AFE, #007BAA)",
                  }}
                >
                  <Input
                    leftElement={
                      <Icon size={4} ml={2}>
                        <SearchIcon color={"coolGray.300"} />
                      </Icon>
                    }
                    w={"90%"}
                    my={2}
                    variant="unstyled"
                    alignSelf="center"
                    placeholder="Search Here..."
                    placeholderTextColor={"coolGray.300"}
                    // borderColor="#007AFE"
                    bgColor={"blue.400"}
                    // border="none"
                    focusOutlineColor="none"
                  />
                  <Box overflow={"scroll"} h={"90%"}>
                    {userList
                      .filter(
                        (v, i, a) =>
                          a.findIndex((v2) => v2.userid === v.userid) === i
                      )
                      .map(
                        (User, i) =>
                          User.userid !== user.uid && (
                            <Pressable
                              key={i}
                              onPress={() =>
                                setData(
                                  User.userid,
                                  User.username,
                                  User?.last_seen,
                                  User?.image
                                )
                              }
                            >
                              {({ isHovered, isFocused, isPressed }) => {
                                return (
                                  <Box
                                    shadow="0"
                                    bg={
                                      isPressed
                                        ? "info.800"
                                        : isHovered
                                        ? "info.500"
                                        : "linear-gradient(to right, #007BAA, #007AFE)"
                                    }
                                    p="2"
                                    // rounded="8"
                                  >
                                    <Card
                                      key={i}
                                      name={User.userid}
                                      display_name={User?.username}
                                      last_message={[...messages]
                                        .reverse()
                                        .find(
                                          (msg) => msg?.name === User?.userid
                                        )}
                                      unseen_count={User?.unseen_count}
                                      image={User?.image}
                                    />
                                  </Box>
                                );
                              }}
                            </Pressable>
                          )
                      )}
                  </Box>
                </VStack>
              ) : (
                <Box w={"100%"}>
                  <Chat
                    width={"100%"}
                    height={"74vh"}
                    messages={messages}
                    name={selectedUserData?.name}
                    display_name={selectedUserData?.display_name}
                    last_seen={selectedUserData?.last_seen}
                    image={selectedUserData?.image}
                  />
                </Box>
              )}
            </Box>
          </Hidden>
          <Hidden from="base" till="md">
            <VStack
              borderLeftRadius={"15"}
              borderRightRadius={"10"}
              w={{ base: "50%", sm: "50%", md: "40%", lg: "35%", xl: "27%" }}
              h={"80vh"}
              shadow={"9"}
              style={{
                background: "linear-gradient(to right, #007BAA, #007AFE)",
              }}
            >
              <Box h={"15%"} mb={"4"}>
                <SidebarHeader />
                <Input
                  leftElement={
                    <Icon size={4} ml={2}>
                      <SearchIcon color={"coolGray.300"} />
                    </Icon>
                  }
                  mb={4}
                  w={"90%"}
                  variant="unstyled"
                  alignSelf="center"
                  placeholder="Search Here..."
                  placeholderTextColor={"coolGray.300"}
                  // borderColor="#007AFE"
                  bgColor={"#3597FE"}
                  // border="none"
                />
              </Box>
              <Box overflowY={"scroll"} h={"82%"}>
                {userList
                  .filter(
                    (v, i, a) =>
                      a.findIndex((v2) => v2.userid === v.userid) === i
                  )
                  .map(
                    (User, i) =>
                      User.userid !== user.uid && (
                        <Pressable
                          key={i}
                          onPress={() =>
                            setData(
                              User.userid,
                              User?.username,
                              User?.last_seen,
                              User?.image
                            )
                          }
                        >
                          {({ isHovered, isFocused, isPressed }) => {
                            return (
                              <Box
                                bg={
                                  isPressed
                                    ? "info.800"
                                    : isHovered
                                    ? "info.500"
                                    : "linear-gradient(to right, #007BAA, #007AFE)"
                                }
                              >
                                <Card
                                  key={i}
                                  name={User.userid}
                                  display_name={User?.username}
                                  last_message={[...messages]
                                    .reverse()
                                    .find((msg) => msg.name === User?.userid)}
                                  unseen_count={User?.unseen_count}
                                  image={User?.image}
                                />
                              </Box>
                            );
                          }}
                        </Pressable>
                      )
                  )}
              </Box>
            </VStack>
            <Chat
              width={{
                base: "50%",
                sm: "50%",
                md: "60%",
                lg: "65%",
                xl: "73%",
              }}
              messages={messages}
              name={selectedUserData?.name}
              display_name={selectedUserData?.display_name}
              last_seen={selectedUserData?.last_seen}
              image={selectedUserData?.image}
            />
          </Hidden>
        </HStack>
      </Container>
    </Box>
  );
}

export default Home;
