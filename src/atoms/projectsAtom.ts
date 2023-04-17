import { atom, useResetRecoilState } from "recoil";

export interface Tech {
  name: "string";
  imageURL: "string";
}

export interface Project {
  id: string;
  name: string;
  techStack: Tech[];
  githubLink: string;
  liveSiteLink: string;
  type: "featured" | "other" | "drafts";
}

const defaultProjectsState: Project = {
  id: "",
  githubLink: "",
  liveSiteLink: "",
  name: "",
  type: "drafts",
  techStack: [],
};

export const projectsState = atom<Project>({
  key: "projectsState",
  default: defaultProjectsState,
});
