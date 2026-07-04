import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { CodingDashboard } from "@/components/coding-dashboard";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CodingDashboard />
      <ContactSection />
    </div>
  );
}
