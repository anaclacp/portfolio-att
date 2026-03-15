const professionalProjects = [
  {
    title: "Pipeline ETL em Larga Escala",
    problem: "Documentos de múltiplas fontes chegavam em formatos diferentes e precisavam ser processados, transformados e indexados de forma confiável e escalável.",
    solution: "Pipeline ETL completo com ingestão assíncrona via SQS, processamento serverless com AWS Lambda e carga em banco vetorial , seguindo princípios de Clean Architecture.",
    tags: ["Python", "AWS Lambda", "SQS", "Clean Architecture", "Vector DB"],
    impact: "Processamento automatizado de documentos em escala corporativa com rastreabilidade de erros"
  },
  {
    title: "CI/CD com GitHub Actions",
    problem: "Deploys manuais e sem cobertura de testes criavam risco de regressão em ambiente de produção.",
    solution: "Pipelines automatizados de build, testes e deploy contínuo com GitHub Actions, integrados com Docker para ambientes reproduzíveis.",
    tags: ["GitHub Actions", "Docker", "CI/CD", "DevOps", "Python"],
    impact: "Entregas mais seguras, rastreáveis e com rollback automático em caso de falha"
  },
  {
    title: "Chef AI , Assistente Culinário com Computer Vision",
    problem: "Desperdício alimentar doméstico é alto por falta de visibilidade do que está na despensa e dificuldade de planejar refeições.",
    solution: "Assistente inteligente com visão computacional para identificar ingredientes e sugerir receitas, reduzindo desperdício. Projeto de TCC em desenvolvimento.",
    tags: ["Python", "Computer Vision", "AI", "React", "FastAPI"],
    impact: "Em desenvolvimento , TCC de Engenharia da Computação (UNAERP)"
  }
]

function ProfessionalCard({ project }) {
  return (
    <div className="card-glow rounded-2xl p-6 group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-deep/50 to-pink-vibrant/50 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-pink-vibrant transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Problema</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            {project.problem}
          </p>

          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Solução</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.solution}
          </p>

          <p className="text-purple-light/80 text-xs italic mb-4">
            → {project.impact}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-purple-light/80 bg-purple-deep/20 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PrivateProjects() {
  return (
    <section id="experiencia" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Backend & Outros</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Pipelines de dados, infraestrutura e projetos acadêmicos em desenvolvimento
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalProjects.map((project, i) => (
            <ProfessionalCard key={i} project={project} />
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Código dos projetos corporativos não disponível por questões de confidencialidade
        </p>
      </div>
    </section>
  )
}

export default PrivateProjects
