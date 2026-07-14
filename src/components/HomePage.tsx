import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Status } from "@/components/Status";
import { Toolbox } from "@/components/Toolbox";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export async function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page">
        <div className="bento">
          <Hero />
          <Status />
          <Toolbox />
          <Experience />
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  );
}
