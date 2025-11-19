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

export interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  disableTransition?: boolean;
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

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  title: string;
  paragraphs: string[];
  highlights?: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  role: string;
  description: string | string[];
  summary?: string;
  previewSrc?: string;
  heroImage?: string;
  detailImages?: string[];
  timeline?: string;
  techStack?: string[];
  metrics?: ProjectMetric[];
  sections?: ProjectSection[];
  links?: ProjectLink[];
  marqueeTexts?: string[];
  marqueeImages?: string[];
  isLatest?: boolean;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: (BlogContentText | BlogContentImage)[];
  publishedAt: string;
  minuteRead: number;
  tags: string[];
  heroImage?: string;
}

export interface BlogContentText {
  type: 'text';
  content: string;
}

export interface BlogContentImage {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

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
