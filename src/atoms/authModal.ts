import { atom } from "recoil";

export interface AuthModal {
  open: boolean;
  type: "login" | "signup" | "logout";
}

const defaultAuthModal: AuthModal = {
  open: false,
  type: "login",
};

export const authModalState = atom<AuthModal>({
  key: "authModalState",
  default: defaultAuthModal,
});
