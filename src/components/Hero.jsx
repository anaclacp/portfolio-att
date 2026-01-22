import BlurText from './ui/BlurText'

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl text-center">
        <div className="mb-6">
          <BlurText
            text="Olá, eu sou a"
            delay={200}
            className="text-lg text-gray-400 font-body"
          />
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-6">
          <BlurText text="Ana Clara" delay={400} className="glow-text" />
        </h1>
        <div className="mb-8">
          <BlurText
            text="Desenvolvedora de IA"
            delay={600}
            className="text-2xl md:text-3xl font-body text-transparent bg-clip-text bg-gradient-to-r from-purple-light to-pink-vibrant"
          />
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 slide-up" style={{ animationDelay: '800ms' }}>
          Apaixonada por automação e IA. Construo soluções inteligentes com RAG, Agents, LLMs e arquiteturas resilientes.
        </p>
        <div className="flex gap-4 justify-center slide-up" style={{ animationDelay: '1000ms' }}>
          <a href="#projetos" className="btn-gradient px-8 py-3 rounded-full font-body font-medium">
            <span>Ver Projetos</span>
          </a>
          <a href="#contato" className="px-8 py-3 rounded-full font-body font-medium border border-purple-light/50 hover:border-pink-vibrant transition-colors">
            Contato
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
