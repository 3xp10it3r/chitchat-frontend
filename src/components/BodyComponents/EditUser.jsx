import axios from "../../Api/axios";
import React from "react";
import { Button, Modal, FormControl, Input } from "native-base";
import { useState } from "react";

import FileBase64 from "react-file-base64";
import { useUserAuth } from "../../context/UserAuthContext";

const EditUser = ({ show, setShow }) => {
  const [img, setImg] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { user } = useUserAuth();

  const updateProfile = async () => {
    await axios.post(`/user/update/${user.uid}`, {
      userid: user.uid,
      username: displayName,
      image: img,
    });
    setShow(false);
  };

  return (
    <>
      <Modal isOpen={show} onClose={() => setShow(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Edit Your Profile</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Display Name</FormControl.Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Avatar</FormControl.Label>
              {/* <input type="file" {...register("img", { required: true })} />
               */}
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImg(base64)}
              />
              {/* <img src={img} /> */}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShow(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  updateProfile();
                }}
              >
                Change
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default EditUser;
