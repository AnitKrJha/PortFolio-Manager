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
      className="transition-all hover:scale-105 bg-pink-300 py-2 md:mx-2 rounded my-1 md:my-0.5 px-2 hover:opacity-90 "
    >
      {props.children}
    </Button>
  );
};

export default SidebarChip;
