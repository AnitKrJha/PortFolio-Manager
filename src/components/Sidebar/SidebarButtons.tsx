import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { RiDraftLine, RiLogoutBoxLine } from "react-icons/ri";
import AuthModal from "../Modals/Auth/AuthModal";
import { authModalState } from "@/atoms/authModal";
import { useSetRecoilState } from "recoil";
import { useUser } from "@supabase/auth-helpers-react";

type Props = {};

const SidebarButtons = (props: Props) => {
  const user = useUser();
  const [open, setOpen] = React.useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <div className="complementary-buttons pr-1 flex w-full justify-end gap-3  py-2">
      {/* <Button className=" px-1 py-1 rounded  relative">
        <Icon as={RiDraftLine} fontSize={30} />
        <div className="badge -right-2 bottom-3/4 aspect-square  flex justify-center items-center w-4  rounded  absolute text-xs p-1 font-bold">
          3
        </div>
      </Button> */}
      <Button
        color="gray.800"
        leftIcon={<Icon as={RiLogoutBoxLine} fontSize={19} />}
        onClick={() => {
          setAuthModalState({ open: true, type: user ? "logout" : "login" });
        }}
        className=" p-1 rounded  relative text-xs font-semibold font-poppins hover:bg-gray-100"
      >
        {user ? "Logout" : "LogIn"}
      </Button>
      <AuthModal />
    </div>
  );
};

export default SidebarButtons;
