import SkillTag from './ui/SkillTag'

const skills = ['Python', 'TypeScript', 'Node.js', 'FastAPI', 'Next.js', 'RAG', 'LangChain', 'AWS', 'Docker', 'n8n']

function About() {
  return (
    <section id="sobre" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-12 text-center">Sobre Mim</h2>

        {/* Avatar pequeno centralizado */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-purple-deep/40 image-container">
              <img
                src="/images/eu.jpg"
                alt="Ana Clara"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-deep to-pink-vibrant rounded-full blur-2xl opacity-60 -z-10"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-pink-vibrant to-purple-deep rounded-full blur-2xl opacity-60 -z-10"></div>
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-6 text-gray-300 font-body text-center md:text-left">
          <p className="text-lg leading-relaxed">
            Sou estudante de <span className="text-pink-vibrant">Engenharia da Computação</span> na UNAERP
            {' '}e atuo como <span className="text-purple-light">Desenvolvedora Full Stack</span> com foco em
            {' '}<span className="text-pink-magenta">Inteligência Artificial</span>. Trabalho principalmente
            com LLMs, agentes de IA, RAG e integração de modelos com APIs, bancos vetoriais e infraestrutura cloud.
          </p>
          <p className="text-lg leading-relaxed">
            Gosto de construir aplicações de ponta a ponta, desde arquitetura e backend até deploy e
            integração entre serviços. Grande parte dos projetos que desenvolvo envolve Python, FastAPI,
            Docker, AWS e ferramentas do ecossistema de IA generativa.
          </p>
          <p className="text-lg leading-relaxed">
            Também atuo como <span className="text-pink-vibrant">freelancer</span> em projetos de IA,
            automação e backend. Já desenvolvi chatbots para atendimento, configurei pipelines de deploy
            com GitHub Actions e trabalhei na manutenção de aplicações Python, corrigindo problemas
            estruturais, melhorando performance e preparando sistemas para produção.
          </p>
          <p className="text-lg leading-relaxed">
            Estou sempre acompanhando novas ferramentas, tendências e atualizações do mercado de tecnologia,
            principalmente no ecossistema de IA e desenvolvimento de software. Também tenho estudado
            {' '}<span className="text-purple-light">Rust</span> por interesse em programação de baixo nível,
            performance e construção de sistemas mais eficientes.
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mt-12 text-center">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Principais Tecnologias</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
