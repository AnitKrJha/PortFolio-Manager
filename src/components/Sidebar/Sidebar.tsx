import { ReactElement } from "react";
import { RiDraftLine } from "react-icons/ri";
import SidebarButtons from "./SidebarButtons";
import SidebarChip from "./SidebarChip";

type SideBarChip = {
  name: string;
  path: string;
  icon?: ReactElement;
};

type Props = {
  chips?: SideBarChip[];
};

const Sidebar = (props: Props) => {
  return (
    <div className="transition-all sidebar w-full flex flex-col item-center md:items-start md:w-60 md:h-screen h-auto bg-red-100">
      <div className="logo text-3xl py-2 px-2">Logo</div>

      <div className="scroll-area overflow-y-auto h-full w-full bg-pink-500 flex flex-wrap md:flex-nowrap justify-center md:justify-start md:py-3 gap-1 md:flex-col">
        <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
          Hello
        </SidebarChip>
        <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
          Hello
        </SidebarChip>
        <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
          Hello
        </SidebarChip>
        <SidebarChip leftIcon={<RiDraftLine fontSize={23} />}>
          Hello
        </SidebarChip>
      </div>

      <SidebarButtons />
    </div>
  );
};

export default Sidebar;
