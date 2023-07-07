import axios from "../../Api/axios";
import React from "react";
import { Button, Modal, FormControl } from "native-base";
import { useState } from "react";

import FileBase64 from "react-file-base64";
import { useUserAuth } from "../../context/UserAuthContext";

const SendImageMessage = ({ showImgModal, setShowImgModal, name }) => {
  const [img, setImg] = useState("");

  const { user } = useUserAuth();

  const sendMessage = async () => {
    await axios.post("/messages/new", {
      message: img,
      name: user.uid,
      to: name,
      timestamp: new Date().toLocaleString(),
      received: false,
    });
    setShowImgModal(false);
    console.log("send");
  };

  return (
    <>
      <Modal
        isOpen={showImgModal}
        onClose={() => setShowImgModal(false)}
        safeAreaTop={true}
      >
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Body>
            <FormControl mt="1">
              <FormControl.Label>Image</FormControl.Label>
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
          <Modal.Footer justifyContent={"center"}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowImgModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  sendMessage();
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
export default SendImageMessage;
