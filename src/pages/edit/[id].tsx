import { Project, projectsState } from "@/atoms/projectsAtom";
import ImagePrev from "@/components/Form/ImagePrev";
import FloatingInput from "@/components/Form/floatingInput";
import FullPageLoader from "@/components/Loaders/FullPageLoader";
import AppShell from "@/components/layouts/AppShell";
import { Badge, Button, ChakraProvider } from "@chakra-ui/react";
import RadioGroup from "@/components/Form/radioGroup";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsExclamation, BsCheck } from "react-icons/bs";
import { useRecoilState } from "recoil";

type Props = {};

const EditPage = (props: Props) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const [allProject, setAllProject] = useRecoilState(projectsState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);

  const router = useRouter();

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    console.log("hello");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalData: any = Object.fromEntries(formData.entries());
    finalData.techStack = finalData.techStack
      .split(",")
      .filter((e: any) => e.trim())
      .map((item: any) => item.trim());
    console.log(finalData);

    const hasImage = !!finalData.projectCoverImg.name;
    const project_id = router.query.id;
    try {
      if (!user) {
        throw new Error("Please Login First");
      }
      //first upload Image to bucket
      if (hasImage) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("project")
            .upload(`${project_id}/cover.png`, finalData.projectCoverImg, {
              upsert: true,
            });

        if (storageError) {
          throw new Error(storageError.message);
        }
      }
      //then update in the table

      const { data, error } = await supabase
        .from("projects")
        .update([
          {
            project_id: project_id,
            project_name: finalData.projectName,
            project_brief: finalData.projectBrief,
            project_cover_img: hasImage
              ? `https://tikwwiikptzriajzcojo.supabase.co/storage/v1/object/public/project/${project_id}/cover.png`
              : project?.coverImage,
            live_link: finalData.liveLink,
            github_link: finalData.githubLink,
            type: finalData.type,
            tech_stack: finalData.techStack,
          },
        ])
        .eq("project_id", project_id)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      setSuccess("Congrats!! The Project has been Updated");
      router.push("/");
    } catch (e: Error | any) {
      setError(e.message);
    }

    setLoading(false);
  };

  const handleTechStack = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const string = e.target.value;
    const final = string
      .split(",")
      .filter((e) => e.trim())
      .map((item) => item.trim());

    console.log(final);
    setTechStack((prev) => final);
  };
  //Fetching Project Function
  const getProjectData = async () => {
    setError("");
    setLoading(true);
    //check in projectState
    const project_id = router.query.id;
    const foundProject = allProject.Projects.find(
      (element) => element.id === project_id
    );
    console.log(foundProject);
    console.log(router.query.id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("project_id", project_id);
      const finalData = projectData![0];
      setProject({
        brief: finalData.project_brief,
        type: finalData.type,
        id: finalData.project_id,
        coverImage: finalData.project_cover_img,
        githubLink: finalData.github_link,
        liveSiteLink: finalData.live_link,
        name: finalData.project_name,
        techStack: finalData.tech_stack,
      });
      if (projectError) throw new Error(projectError.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    try {
      //fetch the projectData
      getProjectData();
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
    setLoading(false);
  }, [router.isReady]);

  return (
    <AppShell>
      <div
        className={` font-poppins  p-4 rounded-lg ${
          success ? "bg-green-100" : error ? "bg-red-100" : "bg-sky-100"
        } `}
      >
        <h1 className=" font-poppins text-center rounded-t text-4xl bg-white max-w-3xl text-black m-auto pt-4 pb-8 font-bold">
          Edit Project
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="max-w-3xl m-auto  p-4 bg-white rounded-b"
        >
          <FloatingInput
            defaultValue={project?.name}
            type="text"
            label="Project Name"
            name="projectName"
            required
          />
          <FloatingInput
            required
            defaultValue={project?.brief}
            type="textarea"
            label="Project Brief"
            name="projectBrief"
          />
          <FloatingInput
            required
            defaultValue={project?.githubLink}
            label="Github Link"
            name="githubLink"
            type="url"
          />
          <FloatingInput
            required
            defaultValue={project?.liveSiteLink}
            label="Live Link"
            name="liveLink"
            type="url"
          />
          <div>
            <div className="relative border-2 rounded border-dashed border-green-400">
              <div className="absolute w-full text-4xl font-bold text-green-400 h-full opacity-50 top-0 left-0 grid items-center justify-center">
                Current Image
              </div>
              <img
                src={project?.coverImage}
                alt="banner Image "
                className="block max-h-[400px]"
              />
            </div>
            <ImagePrev name="projectCoverImg" label="New Image" />
          </div>
          <div className="relative ">
            <ChakraProvider>
              <Badge
                variant={"solid"}
                position={"absolute"}
                colorScheme="messenger"
                className="top-1/2 right-0"
              >
                {techStack.length} Tech
              </Badge>
            </ChakraProvider>
            <FloatingInput
              required
              label="Tech Used"
              name="techStack"
              defaultValue={project?.techStack}
              type="text"
              onChange={handleTechStack}
              // placeholder="separate-using-comma"
            />
          </div>
          <RadioGroup
            required
            defaultValue={project?.type.trim()}
            values={["draft ", "other", "featured"]}
            individualLabels={["Draft", "Other", "Featured"]}
            name="type"
            mainLabel="Type of Project"
          />
          <Button
            type="submit"
            isLoading={loading}
            className=" font-poppins mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark-bg-blue-600 dark-hover:bg-blue-700 dark-focus:ring-blue-800"
          >
            Submit
          </Button>
          {error && (
            <div className="error t flex items-center text-sm text-red-600 shadow shadow-red-400 rounded my-2">
              {" "}
              <BsExclamation strokeWidth={0.2} fontSize={24} /> {error}
              fsd
            </div>
          )}{" "}
          {success && (
            <div className="success flex items-center text-sm text-green-600 shadow shadow-green-400 rounded my-2">
              <BsCheck strokeWidth={0.2} fontSize={24} />
              {success}
            </div>
          )}{" "}
        </form>
      </div>
    </AppShell>
  );
};

export default EditPage;
