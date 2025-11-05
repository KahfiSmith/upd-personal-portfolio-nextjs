import AboutIntro from "@/components/features/about/AboutIntro";
import Hero from "@/components/features/home/Hero";
import ProjectsList from "@/components/features/projects/ProjectsList";
import SkillsMarque from "@/components/features/skills/SkillsMarquee";
import WorkExperience from "@/components/features/works/WorkExperience";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsMarque />
      <AboutIntro/>
      <WorkExperience/>      
      <ProjectsList/>
    </>
  );
}
