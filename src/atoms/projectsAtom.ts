import { atom } from "recoil";

export interface Projects {
  Projects: Project[];
  fetchedOnce: boolean;
}

export interface Project {
  id: string;
  name: string;
  brief: string;
  techStack: string[];
  githubLink: string;
  coverImage: string;
  liveSiteLink: string;
  type: "featured" | "other" | "draft";
}

const defaultProjectsState: Projects = { Projects: [], fetchedOnce: false };

export const projectsState = atom<Projects>({
  key: "projectsState",
  default: defaultProjectsState,
});
