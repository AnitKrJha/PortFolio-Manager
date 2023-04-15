import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { RiDraftLine, RiLogoutBoxLine } from "react-icons/ri";

type Props = {};

const SidebarButtons = (props: Props) => {
  return (
    <div className="complementary-buttons pr-1 flex  bg-red-300 w-full justify-end gap-3  py-2">
      <Button className="bg-blue-400 px-1 py-1 rounded text-white relative">
        <Icon as={RiDraftLine} fontSize={30} />
        <div className="badge -right-2 bottom-3/4 aspect-square  flex justify-center items-center w-4  rounded bg-green-600 text-white absolute text-xs p-1 font-bold">
          3
        </div>
      </Button>
      <Button className="bg-blue-400 p-1 rounded text-white relative">
        <Icon as={RiLogoutBoxLine} fontSize={30} />
      </Button>
    </div>
  );
};

export default SidebarButtons;
