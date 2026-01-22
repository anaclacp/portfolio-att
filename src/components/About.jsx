import SkillTag from './ui/SkillTag'

const skills = ['Python', 'RAG', 'LangChain', 'AWS', 'OpenAI', 'FastAPI', 'Docker', 'Javascript','Next.ts','TypeScript','PHP','n8n']

function About() {
  return (
    <section id="sobre" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-16 text-center">Sobre Mim</h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Single Photo */}
          <div className="relative">
            <div className="image-container rounded-2xl overflow-hidden w-full aspect-[4/5]">
              <img
                src="/images/eu.jpg"
                alt="Ana Clara"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-pink-vibrant/30 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-deep to-pink-vibrant rounded-full blur-2xl opacity-50"></div>
          </div>

          {/* Info */}
          <div>
            <div className="space-y-6 text-gray-300 font-body">
              <p className="text-lg leading-relaxed">
                <span className="text-2xl mr-2">👩🏻‍💻</span>
                Último semestre de <span className="text-pink-vibrant">Engenharia da Computação</span> na Universidade de Ribeirão Preto
              </p>
              <p className="text-lg leading-relaxed">
                <span className="text-2xl mr-2">💻</span>
                Desenvolvedora de IA na <span className="text-purple-light">D3 Works</span>, construindo sistemas com fluxos inteligentes de IA
              </p>
              <p className="text-lg leading-relaxed">
                <span className="text-2xl mr-2">🧠</span>
                Especialista em <span className="text-pink-magenta">RAG pipelines</span>, <span className="text-purple-medium">agentes autônomos</span> e processamento e preparação de documentos (ETL) para IA.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="mt-10">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Principais Tecnologias</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
