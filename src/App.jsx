import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import PrivateProjects from './components/PrivateProjects'
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
      <About />
      <Projects />
      <PrivateProjects />
      <Research />
      <Events />
      <Contact />
      <Footer />
    </>
  )
}

export default App
