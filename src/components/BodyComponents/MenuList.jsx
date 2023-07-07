import { Box, Button, Menu, Pressable } from "native-base";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useUserAuth } from "../../context/UserAuthContext";
import EditUser from "./EditUser";

export const MenuList = ({ color }) => {
  const [open, setOpen] = useState(false);
  const { logOut } = useUserAuth();
  return (
    <Box alignItems="flex-start" justifyContent="center">
      {open && <EditUser show={open} setShow={setOpen} />}
      <Menu
        shadow={2}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
              color={color}
            >
              <HiDotsVertical size={20} />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => setOpen(true)}>EDIT PROFILE</Menu.Item>
        <Menu.Item>SETTINGS</Menu.Item>
        <Menu.Item>
          <Button onPress={logOut}>signout</Button>
        </Menu.Item>
      </Menu>
    </Box>
  );
};
