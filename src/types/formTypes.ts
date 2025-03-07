import { ChangeEvent, FormEvent } from 'react';

export interface ProgressDotProps {
  active: boolean;
  completed: boolean;
}

export interface TeamMember {
  name: string;
  position: string;
  avatar: File | null;
}

export interface FormLinks {
  x: string;
  telegram: string;
  discord: string;
  website: string;
}

export interface FormData {
  name: string;
  tagline: string;
  category: string;
  logo: string | null;
  projectPics: string[] | null;
  team: TeamMember[];
  contactEmail: string;
  links: FormLinks;
  description: string;
  [key: string]: any;
}

export type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FileChangeEvent = ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = FormEvent<HTMLFormElement>;

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
  logo: string;
  projectPics?: string[];
  links?: {
    telegram: string | null;
    x: string | null;
    discord: string | null;
    website: string | null;
  }[];
  createdAt: string;
};