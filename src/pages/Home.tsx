import SpotlightCursor from "../components/SpotlightCursor"
import ScrollProgress from "../components/ScrollProgress"
import FloatingDock from "../components/FloatingDock"
import ParticleField from "../components/ParticleField"
import TechMarquee from "../components/TechMarquee"
import Hero from "../components/Hero"
import About from "../components/About"
import Experience from "../components/Experience"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Education from "../components/Education"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

function SectionDivider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
    </div>
  )
}

function Home() {
  return (
    <>
      <ParticleField />
      <SpotlightCursor />
      <ScrollProgress />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
    </>
  )
}

export default Home
