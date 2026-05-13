const items = [
  {
    title: "Curso de n8n na UNAERP",
    description: "Fui convidada pelos professores Otávio e Milton para ministrar um curso de n8n na UNAERP, apresentando automação de workflows e integrações com IA para os alunos da universidade. Para que o conhecimento não ficasse só na sala de aula, disponibilizei todo o material do curso de forma aberta no GitHub, com workflows práticos e exemplos que qualquer pessoa pode usar para aprender.",
    year: "2026",
    type: "Docência / Curso",
    institution: "Universidade de Ribeirão Preto",
    images: [
      "/images/curso-n8n-unaerp-1.jpg",
      "/images/curso-n8n-unaerp-2.jpg"
    ],
    github: "https://github.com/anaclacp/curso-n8n-unaerp-2026",
    linkedin: "https://www.linkedin.com/posts/anaclacp_n8n-ia-automaaexaetodeprocessos-ugcPost-7455258430782574592-aJDm?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs"
  },
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
    linkedin: "https://www.linkedin.com/posts/anaclacp_neste-ano-participei-do-25%C2%BA-conic-da-universidade-activity-7263220922872963073-YAai?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
    image: "/images/iniciacao-cientifica-2.jpg"
  }
]

function AcademicCard({ item }) {
  const hasGallery = Array.isArray(item.images) && item.images.length > 1

  return (
    <div className="card-glow rounded-2xl overflow-hidden grid md:grid-cols-5 gap-0">
      {/* Image */}
      <div className="md:col-span-2 relative overflow-hidden">
        <div className="image-container h-full min-h-[250px]">
          {hasGallery ? (
            <div className="grid grid-rows-2 h-full gap-1 bg-dark-900">
              {item.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-pink-vibrant/90 text-white text-xs font-mono px-3 py-1 rounded-full">
            {item.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-3 p-8 flex flex-col justify-center">
        <span className="text-purple-light text-sm font-mono mb-2">{item.type}</span>
        <h3 className="font-display text-2xl font-semibold mb-3">{item.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
        <p className="text-gray-500 text-sm mb-6">
          <span className="text-pink-magenta">📍</span> {item.institution}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-light hover:text-pink-vibrant transition-colors w-fit"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Ver material no GitHub
            </a>
          )}

          {item.linkedin && (
            <a
              href={item.linkedin}
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
    </div>
  )
}

function Research() {
  return (
    <section id="academico" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Acadêmico</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Iniciações científicas, docência e contribuições acadêmicas
        </p>

        <div className="space-y-12">
          {items.map((item, i) => (
            <AcademicCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Research
