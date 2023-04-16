import React from "react";
import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children?: ReactNode[] | ReactNode;
};

const AppShell = (props: Props) => {
  return (
    <div className="min-w-full flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <div className="content px-4 py-4 md:h-screen overflow-y-auto w-[98vw] mx-auto overflow-x-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default AppShell;
