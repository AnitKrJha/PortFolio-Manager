import { Project, Projects, projectsState } from "@/atoms/projectsAtom";
import ProjectCard from "@/components/Cards/projectCard";
import FullPageLoader from "@/components/Loaders/FullPageLoader";
import AppShell from "@/components/layouts/AppShell";
import { Button } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRecoilState } from "recoil";
import Link from "next/link";

export default function Home() {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animationParent] = useAutoAnimate();
  const getAllProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("projects").select("*");
      if (error) throw new Error(error.message);

      const Projects: Projects = { Projects: [], fetchedOnce: true };
      for (let item of data!) {
        Projects.Projects.push({
          brief: item.project_brief,
          id: item.project_id,
          name: item.project_name,
          githubLink: item.github_link,
          liveSiteLink: item.live_link,
          techStack: item.tech_stack,
          type: item.type,
          coverImage: item.project_cover_img,
        });
      }

      setAllProjects(Projects);
      console.log(data);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const [allProjects, setAllProjects] = useRecoilState(projectsState);
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <AppShell>
      <h1 className="font-poppins text-center font-semibold text-2xl md:text-3xl ">
        Featured Projects
      </h1>

      <div ref={animationParent}>
        {loading ? (
          <FullPageLoader />
        ) : (
          <div className="flex flex-wrap m-auto gap-2">
            {allProjects.Projects.map((item, indx) => {
              return <ProjectCard key={indx} project={item} />;
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
