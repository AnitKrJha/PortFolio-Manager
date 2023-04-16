import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { RiDraftLine, RiLogoutBoxLine } from "react-icons/ri";

type Props = {};

const SidebarButtons = (props: Props) => {
  return (
    <div className="complementary-buttons pr-1 flex w-full justify-end gap-3  py-2">
      {/* <Button className=" px-1 py-1 rounded  relative">
        <Icon as={RiDraftLine} fontSize={30} />
        <div className="badge -right-2 bottom-3/4 aspect-square  flex justify-center items-center w-4  rounded  absolute text-xs p-1 font-bold">
          3
        </div>
      </Button> */}
      <Button
        color="gray.600"
        leftIcon={<Icon as={RiLogoutBoxLine} fontSize={19} />}
        className=" p-1 rounded  relative text-xs font-poppins hover:bg-gray-100"
      >
        LogOut
      </Button>
    </div>
  );
};

export default SidebarButtons;
