import { ReactElement, useState, useRef } from "react";
import {
  BsFillFolderFill,
  BsFillPatchPlusFill,
  BsStarFill,
} from "react-icons/bs";
import { RiTaskFill } from "react-icons/ri";
import Logo from "/public/Logo.svg";
import { CgMenuGridR } from "react-icons/cg";
import SidebarButtons from "./SidebarButtons";
import SidebarChip from "./SidebarChip";
import { Avatar, Button, useOutsideClick } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginModal from "../Modals/Auth/AuthModal";
import { useUser } from "@supabase/auth-helpers-react";

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
  const router = useRouter();
  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (open === true) setOpen(false);
    },
  });

  const user = useUser();

  return (
    <div
      ref={ref}
      className="transition-all bg-white md:rounded-r-2xl rounded-b-2xl sidebar w-full flex flex-col item-center md:items-start md:w-60 md:h-screen h-auto "
    >
      <div className="logo text-3xl py-2 px-2 relative text-black text-center w-full">
        <Image src={Logo} alt="logo" className="md:m-auto ml-2" priority />
        <Button
          position={"absolute"}
          display={{ md: "none" }}
          className="absolute right-4 top-1/4 md:hidden"
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
          <Avatar
            bg={!user ? "red.400" : "green.500"}
            size={"lg"}
            className="w-20 aspect-square"
          />
          <p className="w-full text-center font-medium font-poppins">
            Anit Kr Jha
          </p>
          <span className="text-gray-500 text-xs font-poppins">Admin</span>
        </div>

        <div className="scroll-area gap-2 mb-3 overflow-y-auto  text-black w-full flex flex-wrap md:flex-nowrap justify-center md:justify-start md:py-3 md:flex-col e items-center md:items-stretch md:px-6">
          <SidebarChip link="/" leftIcon={<BsFillFolderFill fontSize={20} />}>
            All Projects
          </SidebarChip>
          <SidebarChip link="/featured" leftIcon={<BsStarFill fontSize={20} />}>
            Featured
          </SidebarChip>
          <SidebarChip link="/drafts" leftIcon={<RiTaskFill fontSize={20} />}>
            Drafts
          </SidebarChip>
          <SidebarChip
            link="/edit/new"
            leftIcon={<BsFillPatchPlusFill fontSize={20} />}
          >
            New Project
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
