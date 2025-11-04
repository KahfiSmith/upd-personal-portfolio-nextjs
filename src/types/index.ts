export interface ProjectsItemProps {
  imgSrc: string;
  title: string;
  desc: string;
  type?: string;
}

export interface SkillItemProps {
  imgSrc: string;
  label: string;
  desc: string;
}

export interface WorkExperienceItemProps {
  id: number;
  title: string;
  role: string;
  period: string;
  company: string;
  description: string | string[];
  tags: string | string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string | string[];
  tags: string[];
  link?: string;
  previewSrc?: string;
  role: string;
};

export type SocialName = 'github' | 'linkedin' | 'facebook' | 'instagram';

export interface SocialLink { name: SocialName; href: string }
export interface Button { label: string; href: string }
export interface Props {
  headlinePrefix?: string;
  headlineHighlight?: string;
  description?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  socials?: SocialLink[];
  copyright?: string;
  tagline?: string;
}

export type Social = SocialLink;
export type FooterProps = Props;
