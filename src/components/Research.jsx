const papers = [
  {
    title: "Impactos das Variáveis Climáticas e Anomalias Atmosféricas na Dinâmica dos Casos de Dengue: Uma Análise Multivariada com Foco em Extremos Climáticos.",
    description: "Sistema de ML para analisar como variáveis climáticas (temperatura, chuva, umidade) e anomalias atmosféricas (como El Niño e La Niña) impactam o número de casos de dengue na cidade de Ribeirão Preto (SP), com foco especial em eventos extremos.",
    year: "2025",
    type: "Iniciação Científica",
    institution: "Universidade de Ribeirão Preto",
    linkedin: null,
    image: "/images/iniciacao-cientifica.jpg"
  },
  {
    title: "Coleta automatizada de dados meteorológicos e de saúde para estudos preditivos de surtos sazonais de arboviroses.",
    description: "Esse projeto busca auxiliar na previsão de surtos de doenças como dengue, zika e chikungunya em Ribeirão Preto, integrando dados meteorológicos e de saúde pública. Utilizando R, Python e MySQL, construí uma base sólida para alimentar modelos preditivos que apoiam ações de prevenção e controle.",
    year: "2024",
    type: "Iniciação Científica",
    institution: "Universidade de Ribeirão Preto",
    linkedin: "https://www.linkedin.com/posts/ana-clara-pereira-51264a21a_neste-ano-participei-do-25%C2%BA-conic-da-universidade-activity-7263220922872963073-u7HE?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
    image: "/images/iniciacao-cientifica-2.jpg"
  }
]

function ResearchCard({ paper }) {
  return (
    <div className="card-glow rounded-2xl overflow-hidden grid md:grid-cols-5 gap-0">
      {/* Image */}
      <div className="md:col-span-2 relative overflow-hidden">
        <div className="image-container h-full min-h-[250px]">
          <img
            src={paper.image}
            alt={paper.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-pink-vibrant/90 text-white text-xs font-mono px-3 py-1 rounded-full">
            {paper.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-3 p-8 flex flex-col justify-center">
        <span className="text-purple-light text-sm font-mono mb-2">{paper.type}</span>
        <h3 className="font-display text-2xl font-semibold mb-3">{paper.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{paper.description}</p>
        <p className="text-gray-500 text-sm mb-6">
          <span className="text-pink-magenta">📍</span> {paper.institution}
        </p>

        {paper.linkedin && (
          <a
            href={paper.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-light hover:text-pink-vibrant transition-colors w-fit"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Ver no LinkedIn
          </a>
        )}
      </div>
    </div>
  )
}

function Research() {
  return (
    <section id="pesquisa" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Pesquisa Científica</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Minhas iniciações científicas e contribuições acadêmicas
        </p>

        <div className="space-y-12">
          {papers.map((paper, i) => (
            <ResearchCard key={i} paper={paper} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Research
