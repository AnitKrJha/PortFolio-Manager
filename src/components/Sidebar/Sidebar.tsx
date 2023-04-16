import { ReactElement, useState, useRef } from "react";
import { RiDraftLine } from "react-icons/ri";
import { CgMenuGridR } from "react-icons/cg";
import SidebarButtons from "./SidebarButtons";
import SidebarChip from "./SidebarChip";
import { Avatar, Button, useOutsideClick } from "@chakra-ui/react";

type SideBarChip = {
  name: string;
  path: string;
  icon?: ReactElement;
};

type Props = {
  chips?: SideBarChip[];
};

const Sidebar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (open === true) setOpen(false);
    },
  });

  return (
    <div
      ref={ref}
      className="transition-all bg-white md:rounded-r-2xl rounded-b-2xl sidebar w-full flex flex-col item-center md:items-start md:w-60 md:h-screen h-auto "
    >
      <div className="logo text-3xl py-2 px-2 relative text-black text-center w-full">
        Logo
        <Button
          position={"absolute"}
          display={{ md: "none" }}
          className="absolute right-4 md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <CgMenuGridR />
        </Button>
      </div>
      <div
        className={`w-full duration-500 delay-75 md:h-full ${
          open
            ? "opacity-100 transition-all"
            : "opacity-0 h-0 overflow-hidden  md:overflow-auto md:opacity-100 transition-none"
        } `}
      >
        <div className="avatar text-center py-12 w-full">
          <Avatar bg="gray.400" size={"lg"} className="w-20 aspect-square" />
          <p className="w-full text-center font-bold">Anit Kr Jha</p>
          <span className="text-gray-500 text-xs">Admin</span>
        </div>

        <div className="scroll-area overflow-y-auto  text-black w-full flex flex-wrap md:flex-nowrap justify-center md:justify-start md:py-3 gap-1 md:flex-col e items-center md:items-stretch md:px-6">
          <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
            Hello Bro
          </SidebarChip>
          <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
            Hello hi
          </SidebarChip>
          <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
            Hello
          </SidebarChip>
          <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
            Hello
          </SidebarChip>
        </div>
      </div>
      <div className={`justify-end w-full ${open ? "flex" : "md:flex hidden"}`}>
        <SidebarButtons />
      </div>
    </div>
  );
};

export default Sidebar;
