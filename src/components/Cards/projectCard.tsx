import { Avatar, Button } from "@chakra-ui/react";
import React from "react";
import { BsGithub, BsLink45Deg } from "react-icons/bs";
import { CgEditExposure, CgPen } from "react-icons/cg";
import {
  RiDatabase2Fill,
  RiDatabaseFill,
  RiGatsbyFill,
  RiMoonFoggyFill,
  RiReactjsFill,
  RiUser2Fill,
} from "react-icons/ri";

type Props = {};

const ProjectCard = (props: Props) => {
  return (
    <div className="mx-auto z-5 my-4 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]  undefined">
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            title="Edit Project"
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <CgPen fontSize={22} />
          </button>
        </div>
        <div className="mb-3 flex items-center justify-between px-1 md:items-start">
          <div className="mb-2">
            <p className="text-lg font-poppins font-semibold text-navy-700">
              {" "}
              Abstract Colors{" "}
            </p>
            <p className="mt-1 text-xs font-poppins text-gray-600 md:mt-1">
              By Esthera Jackson{" "}
            </p>
          </div>
          <div className="flex  md:mt-2 ">
            <Avatar
              bg="blue.400"
              size={"lg"}
              title="ReactJs"
              icon={<RiReactjsFill color="white" size={"24px"} />}
              className="w-8 aspect-square -ml-2 shadow-md shadow-black hover:scale-110 transition-all cursor-pointer duration-500"
            />
            <Avatar
              bg="teal.500"
              size={"lg"}
              title="GatsbyJs"
              icon={<RiGatsbyFill color="white" size={"24px"} />}
              className="w-8 aspect-square -ml-2 shadow-md shadow-black hover:scale-110 transition-all cursor-pointer duration-500"
            />
            <Avatar
              bg="yellow.700"
              size={"lg"}
              title="MySQL"
              icon={<RiDatabase2Fill color="white" size={"24px"} />}
              className="w-8 aspect-square -ml-2 shadow-md shadow-black hover:scale-110 transition-all cursor-pointer duration-500"
            />
            <Avatar
              bg="black"
              title="Dark Mode"
              size={"lg"}
              icon={<RiMoonFoggyFill color="white" size={"24px"} />}
              className="w-8 aspect-square -ml-2 shadow-md shadow-black hover:scale-110 transition-all cursor-pointer duration-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-end md:items-center gap-3 ">
          <div className="flex">
            <Button
              leftIcon={<BsLink45Deg />}
              className="rounded-[5px]  px-2 py-1 text-sm font-medium font-poppins  bg-transparent text-blue-900 transition duration-200 hover:bg-blue-900 hover:text-white border border-blue-900 active:bg-blue-700"
            >
              Live Site
            </Button>
          </div>
          <Button
            leftIcon={<BsGithub />}
            className="rounded-[5px]  px-2 py-1  text-sm font-medium font-poppins  bg-blue-900 text-white transition duration-200 hover:bg-blue-800 active:bg-blue-700"
          >
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
