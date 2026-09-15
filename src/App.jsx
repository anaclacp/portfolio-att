import { Routes, Route, Navigate } from 'react-router-dom'
import Background from './components/ui/Background'
import ScrollToTop from './components/ui/ScrollToTop'
import useScrollReveal from './hooks/useScrollReveal'
import Home from './pages/Home'
import Learning from './pages/Learning'
import AdminLearning from './pages/AdminLearning'

function App() {
  useScrollReveal()

  return (
    <>
      <Background />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/admin/learning" element={<AdminLearning />} />
        {/* Qualquer outra rota volta para a home em vez de tela branca. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
