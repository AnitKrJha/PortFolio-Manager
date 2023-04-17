import { atom, useResetRecoilState } from "recoil";

export interface Tech {
  name: string;
  imageURL: string;
}
export type Projects = Project[];

export interface Project {
  id: string;
  name: string;
  techStack: Tech[];
  githubLink: string;
  liveSiteLink: string;
  type: "featured" | "other" | "drafts";
}

const defaultProjectsState: Projects = [];

export const projectsState = atom<Projects>({
  key: "projectsState",
  default: defaultProjectsState,
});
