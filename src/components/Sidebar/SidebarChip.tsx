import { Button } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

type Props = {
  leftIcon: ReactElement;
  children: ReactNode[] | ReactNode;
};

const SidebarChip = (props: Props) => {
  return (
    <Button
      leftIcon={props.leftIcon}
      justifyContent={"start"}
      alignItems="center"
      className="transition-all  font-medium   text-sm px-4 hover:scale-105 justify-center bg-gray-200 py-2 md:mx-2 rounded-xl my-1 md:my-0.5 hover:opacity-90 font-poppins mx-1"
    >
      {props.children}
    </Button>
  );
};

export default SidebarChip;
