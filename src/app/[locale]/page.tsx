import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Timeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
