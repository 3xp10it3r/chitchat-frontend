import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Input,
  Pressable,
  Spinner,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import ToggleDarkMode from "../Common/ToggleDarkMode";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, googleSignIn } = useUserAuth();
  const { colorMode } = useColorMode("dark");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      setLoading(true);
      await signUp(email, password);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const validation = () => {
    if (!email.includes("@")) {
      setError("Email is not valid");
      return;
    }
    if (password.length < 6) {
      setError("password length atleast be 8");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!!!");
      return;
    }
    handleSubmit();
  };
  const googleSignInWithPopUp = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <>
      {error && (
        <Alert w="30%" status={"error"}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {error}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                p={0}
                _hover={{
                  size: 25,
                }}
                _focus={{
                  borderWidth: 0,
                }}
                icon={<GrClose w={5} size={10} />}
                onPress={() => setError("")}
              />
            </HStack>
          </VStack>
        </Alert>
      )}
      <Stack
        space={4}
        w={{ base: "70%", sm: "70%", md: "50%", lg: "30%" }}
        alignItems="center"
        borderWidth={"1"}
        pt={8}
        pb={12}
        mt={"5%"}
        borderColor={colorMode === "light" ? "coolGray.300" : "black"}
        shadow={"8"}
      >
        <Text
          fontSize={{
            base: "2xl",
            md: "2xl",
            lg: "4xl",
          }}
          bold
          mb={"4"}
          // opacity={0.5}
          style={
            colorMode === "dark"
              ? {
                  textShadow: "4px 4px #3e00fe",
                }
              : { textShadow: "3px 3px pink" }
          }
        >
          ChitChat
        </Text>
        <Input
          w={"65%"}
          type={"email"}
          value={email}
          fontSize={14}
          onChange={(e) => setEmail(e.target.value)}
          _light={{
            bg: "coolGray.100",
          }}
          _dark={{
            bg: "coolGray.800",
          }}
          placeholder="Email"
        />

        <Input
          w={"65%"}
          value={password}
          fontSize={14}
          type={show ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputRightElement={
            // post = {pos}
            <Button
              rounded="none"
              w="1/9"
              onPress={() => setShow(!show)}
              p="2"
              _light={{
                bg: "coolGray.100",
              }}
              _dark={{
                bg: "coolGray.800",
              }}
              colorScheme={
                colorMode === "light" ? "coolGray.100" : "coolGray.800"
              }
            >
              {show ? <AiFillEyeInvisible /> : <AiFillEye />}
            </Button>
          }
          _light={{
            bg: "coolGray.100",
          }}
          _dark={{
            bg: "coolGray.800",
          }}
          placeholder="Password"
        />
        <Input
          w={"65%"}
          type={"password"}
          fontSize={14}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          _light={{
            bg: "coolGray.100",
          }}
          _dark={{
            bg: "coolGray.800",
          }}
          placeholder="Confirm Password"
        />
        <HStack pt={4} w={"100%"} px={"18%"}>
          <Button
            w={{
              base: "100%",
              md: "100%",
            }}
            size={8}
            color="primary"
            onPress={validation}
            bgColor="#0095F6"
          >
            {loading ? <Spinner color={"white"} /> : <Text bold>Sign Up</Text>}
          </Button>
        </HStack>
        <HStack
          space={4}
          w={"100%"}
          px={"18%"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Divider w={"40%"} />
          <Text bold fontSize={{ base: "10", md: "14", lg: "md" }}>
            OR
          </Text>
          <Divider w={"40%"} />
        </HStack>
        <HStack
          pt={4}
          w={"100%"}
          px={"18%"}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            w={{
              base: "100%",
              md: "100%",
            }}
            variant="outline"
            size={8}
            color="primary"
            onPress={googleSignInWithPopUp}
            leftIcon={<FcGoogle />}
          >
            <Text bold>Sign In With Google</Text>
          </Button>
        </HStack>
      </Stack>
      <Stack
        // space={4}
        w={{ base: "70%", sm: "70%", md: "50%", lg: "30%" }}
        alignItems="center"
        borderWidth={"1"}
        mt={"2%"}
        p={4}
        borderColor={colorMode === "light" ? "coolGray.300" : "black"}
        justifyContent="center"
        shadow={"8"}
      >
        <Text fontWeight={"semibold"}>
          Already have an account ?{"  "}
          <Text fontWeight={"extrabold"} color="#42A5F8">
            <Pressable
              onPress={() => navigate("/login", { replace: "true" })}
              _hover={{
                color: "#0095F6",
                fontSize: "xl",
              }}
            >
              <Text>Log In</Text>
            </Pressable>
          </Text>
        </Text>
      </Stack>
      <Box position={"fixed"} bottom="5" right={"5"}>
        <ToggleDarkMode />
      </Box>
    </>
  );
};

export default SignUp;
