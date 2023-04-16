import ProjectCard from "@/components/Cards/projectCard";
import AppShell from "@/components/layouts/AppShell";
import React from "react";

type Props = {};

const Featured = (props: Props) => {
  return (
    <AppShell>
      <h1 className="font-poppins text-center font-semibold text-2xl md:text-3xl ">
        Featured Projects
      </h1>
      <div className="flex flex-wrap m-auto gap-2">
        <ProjectCard type="featured" />
        <ProjectCard type="other" />
        <ProjectCard type="draft" />
      </div>
    </AppShell>
  );
};

export default Featured;
