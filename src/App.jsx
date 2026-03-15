import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects from './components/Projects'
import PrivateProjects from './components/PrivateProjects'
import TechStack from './components/TechStack'
import About from './components/About'
import Research from './components/Research'
import Events from './components/Events'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/ui/Background'

function App() {
  return (
    <>
      <Background />
      <Navigation />
      <Hero />
      <Projects />
      <PrivateProjects />
      <TechStack />
      <About />
      <Research />
      <Events />
      <Contact />
      <Footer />
    </>
  )
}

export default App
