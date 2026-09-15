import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import LearningCTA from '../components/LearningCTA'
import Services from '../components/Services'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Research from '../components/Research'
import Events from '../components/Events'
import Freelance from '../components/Freelance'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import usePageMeta from '../hooks/usePageMeta'

function Home() {
  const { t } = useLanguage()
  usePageMeta({ title: t.meta.title, description: t.meta.description })

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <LearningCTA />
      <Services />
      <Projects />
      <TechStack />
      <Research />
      <Events />
      <Freelance />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
