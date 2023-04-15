import React from "react";
import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children?: ReactNode[];
};

const AppShell = (props: Props) => {
  return (
    <div className="min-w-full flex flex-col md:flex-row min-h-screen bg-black">
      <Sidebar />

      <div className="content">{props.children}</div>
    </div>
  );
};

export default AppShell;
