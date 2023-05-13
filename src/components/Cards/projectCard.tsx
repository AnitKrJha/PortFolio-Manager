import { Project } from "@/atoms/projectsAtom";
import { Avatar, Button, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BsGithub, BsLink45Deg } from "react-icons/bs";
import { CgPen } from "react-icons/cg";

type Props = {
  project: Project;
};

const ProjectCard = (props: Props) => {
  const randomColors = ["blue.400", "teal.500", "yellow.700", "black"];
  const { project } = props;
  const [imageLoading, setImageLoading] = useState(true);

  let color = "";
  if (project.type === "featured") color = "bg-green-600";
  if (project.type.trimEnd() === "draft") color = "bg-red-500";
  if (project.type === "other") color = "bg-gray-600";
  return (
    <div className="mx-auto  z-5 my-4 mt-16 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]  undefined">
      <div className="h-full  w-full flex flex-col">
        <div
          className={`flex gap-1 font-poppins px-2 items-center ${color}  text-white text-xs chip absolute bottom-full right-4 font-semibold uppercase p-1 rounded-t-md`}
        >
          {project.type}
        </div>
        <div className="relative w-full max-h-48 aspect-[4/3]">
          {imageLoading && (
            <div className="w-full rounded-xl h-40 bg-gray-500 animate-pulse"></div>
          )}
          <Image
            src={
              project.coverImage ??
              "https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
            }
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
            display={imageLoading ? "none" : "auto"}
            // width={240}
            // height={240}
            onLoad={() => {
              console.log("loaded");
              setImageLoading(false);
            }}
          />
          <Link
            href={`/edit/${project.id}`}
            title="Edit Project"
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <CgPen fontSize={22} />
          </Link>
        </div>
        <div className="mb-3 flex items-end flex-col justify-between px-1 md:items-start">
          <div className="mb-2">
            <p className="text-lg font-poppins font-semibold text-navy-700 uppercase">
              {project.name}
            </p>
            <p className="mt-1 text-xs font-poppins text-gray-600 md:mt-1">
              {project.brief} Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Itaque quod aut consequatur. Temporibus enim
              quod corporis eaque adipisci dolorum commodi minima porro
              doloremque sequi, animi rem deleniti saepe impedit quibusdam.
            </p>
          </div>
          <div className="flex  md:mt-2 my-4">
            {project.techStack.map((item, index: number) => {
              return (
                <Avatar
                  key={index}
                  bg={randomColors?.[index % randomColors.length]}
                  size={"lg"}
                  textColor={"gray.200"}
                  name={item}
                  title={item}
                  className="w-8 aspect-square -ml-2 shadow-md shadow-black hover:scale-110 transition-all cursor-pointer duration-500"
                />
              );
            })}
          </div>
        </div>
        <div className="flex mt-auto items-center justify-around md:items-center gap-3 ">
          <div className="flex justify-self-end self-end">
            <Button
              as="a"
              target="_blank"
              href={project.liveSiteLink}
              leftIcon={<BsLink45Deg />}
              className="rounded-[5px]  px-2 py-1 text-sm font-medium font-poppins  bg-transparent text-blue-900 transition duration-200 hover:bg-blue-900 hover:text-white border border-blue-900 active:bg-blue-700"
            >
              Live Site
            </Button>
          </div>
          <Button
            as="a"
            href={project.githubLink}
            target="_blank"
            leftIcon={<BsGithub />}
            className="rounded-[5px]  px-2 py-1  text-sm font-medium font-poppins  bg-blue-900 text-white transition duration-200 hover:bg-blue-800 active:bg-blue-700"
          >
            Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
