import { authModalState } from "@/atoms/authModal";
import { useRecoilState } from "recoil";
import { theme } from "@/chakra/theme";
import {
  Button,
  ChakraBaseProvider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";

type Props = {};

const AuthModal = (props: Props) => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  return (
    <>
      <ChakraBaseProvider theme={theme}>
        <Modal
          isCentered
          isOpen={modalState.open}
          onClose={() => setModalState((prev) => ({ ...prev, open: false }))}
        >
          <ModalOverlay />
          <ModalContent marginX={2}>
            <ModalHeader className="font-poppins">
              {modalState.type === "logout" ? "LogOut" : "Login/SignUp"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalState.type === "login" && (
                <Login setAuthModalState={setModalState} />
              )}
              {modalState.type === "signup" && (
                <SignUp setAuthModalState={setModalState} />
              )}
              {modalState.type === "logout" && (
                <Logout setAuthModalState={setModalState} />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraBaseProvider>
    </>
  );
};

export default AuthModal;
