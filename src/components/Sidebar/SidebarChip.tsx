import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";

type Props = {
  leftIcon: ReactElement;
  children: ReactNode[] | ReactNode;
  link: string;
};

const SidebarChip = (props: Props) => {
  const router = useRouter();
  return (
    <Button
      leftIcon={props.leftIcon}
      justifyContent={"start"}
      alignItems="center"
      onClick={() => {
        router.push(props.link);
      }}
      className={`transition-all  font-medium font-poppins   text-sm px-4 hover:scale-105 justify-center gap-2 py-2 md:mx-2 rounded-xl my-1 md:my-0.5 hover:opacity-90  mx-1 ${
        router.asPath === props.link ? "bg-gray-100" : ""
      }`}
    >
      {props.children}
    </Button>
  );
};

export default SidebarChip;
