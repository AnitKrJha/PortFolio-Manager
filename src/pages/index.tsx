import { Project, Projects, projectsState } from "@/atoms/projectsAtom";
import ProjectCard from "@/components/Cards/projectCard";
import AppShell from "@/components/layouts/AppShell";
import { Button } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  const supabase = useSupabaseClient();

  const getAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");

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
      <div className="flex flex-wrap m-auto gap-2">
        {allProjects.Projects.map((item, indx) => {
          return <ProjectCard key={indx} project={item} />;
        })}
      </div>
    </AppShell>
  );
}
