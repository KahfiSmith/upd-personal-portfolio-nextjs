import SimpleCurtainLoader from "@/components/common/SimpleCurtainLoader";
import AboutIntro from "@/components/features/about/AboutIntro";
import Hero from "@/components/features/home/Hero";
import ProjectsList from "@/components/features/projects/ProjectsList";
import SkillsMarque from "@/components/features/skills/SkillsMarque";
import WorkExperience from "@/components/features/works/WorkExperience";
import FloatingDockNav from "@/components/common/FloatingDockNav";

export default function Home() {
  return (
    <>
      <SimpleCurtainLoader />
      <Hero />
      <SkillsMarque />
      <AboutIntro />
      <WorkExperience />
      <ProjectsList limit={5} />
      <FloatingDockNav />
    </>
  );
}
