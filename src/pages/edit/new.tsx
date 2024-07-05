import {
  Badge,
  Button,
  ChakraBaseProvider,
  ChakraProvider,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { setDefaultResultOrder } from "dns";
import React, { ChangeEvent, FormEvent, useState } from "react";
import AppShell from "@/components/layouts/AppShell";
import JsonDisplay from "@/components/extras/jsonDisplay";
import FloatingInput from "@/components/Form/floatingInput";
import ImagePrev from "@/components/Form/ImagePrev";
import {
  BsCheck,
  BsExclamation,
  BsExclamationCircleFill,
  BsPlus,
} from "react-icons/bs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RadioGroup from "@/components/Form/radioGroup";

type Props = {};

const CreateEvent = (props: Props) => {
  const [techStack, setTechStack] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const supabase = useSupabaseClient();

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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    console.log("hello");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalData: any = Object.fromEntries(formData.entries());
    finalData.techStack = techStack;
    console.log(finalData);

    ///after reading form data

    const randomUUID = crypto.randomUUID();
    const hasImage = !!finalData.projectCoverImg.name;

    try {
      //first upload Image to bucket
      if (hasImage) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("project")
            .upload(`${randomUUID}/cover.png`, finalData.projectCoverImg, {
              cacheControl: "3600",
              upsert: true,
            });

        if (storageError) {
          throw new Error(storageError.message);
        }
      }
      //then update in the table

      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            project_id: randomUUID,
            project_name: finalData.projectName,
            project_brief: finalData.projectBrief,
            project_cover_img: hasImage
              ? `https://tikwwiikptzriajzcojo.supabase.co/storage/v1/object/public/project/${randomUUID}/cover.png`
              : null,
            live_link: finalData.liveLink,
            github_link: finalData.githubLink,
            type: finalData.type,
            tech_stack: finalData.techStack,
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }
      setSuccess("Congrats!! New Project has been created");
    } catch (e: Error | any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <AppShell>
      <div
        className={` font-poppins  p-4 rounded-lg  ${
          success ? "bg-green-100" : error ? "bg-red-100" : "bg-sky-100"
        } `}
      >
        <h1 className=" font-poppins text-center rounded-t text-4xl bg-white max-w-3xl text-black m-auto pt-4 pb-8 font-bold">
          New Project
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="max-w-3xl m-auto  p-4 bg-white rounded-b"
        >
          <FloatingInput
            type="text"
            label="Project Name"
            name="projectName"
            required
          />
          <FloatingInput
            required
            type="textarea"
            label="Project Brief"
            name="projectBrief"
          />
          <FloatingInput
            required
            label="Github Link"
            name="githubLink"
            type="url"
          />
          <FloatingInput
            required
            label="Live Link"
            name="liveLink"
            type="url"
          />
          <ImagePrev name="projectCoverImg" label="Cover Image" />
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
              type="text"
              onChange={handleTechStack}
              // placeholder="separate-using-comma"
            />
          </div>
          <RadioGroup
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

export default CreateEvent;
