import SkillTag from './ui/SkillTag'

const skills = ['Python', 'RAG', 'LangChain', 'AWS', 'OpenAI', 'FastAPI', 'Docker', 'Javascript','Next.js','TypeScript','PHP','n8n']

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
                Estou no último semestre de <span className="text-pink-vibrant">Engenharia da Computação</span> na UNAERP, 
                e trabalho como desenvolvedora de IA na <span className="text-purple-light">D3 Works</span>, onde construo 
                sistemas inteligentes que conversam com documentos e automatizam processos.
              </p>
              <p className="text-lg leading-relaxed">
                Meu dia a dia envolve criar <span className="text-pink-magenta">pipelines RAG</span>, desenvolver{' '}
                <span className="text-purple-medium">agentes autônomos</span> e transformar diversos dados em 
                informação útil e flexível. Adoro quando código e criatividade se encontram, seja numa arquitetura bem pensada 
                ou num projeto de visão computacional.
              </p>
              <p className="text-lg leading-relaxed">
                Quando não estou debugando código, provavelmente estou testando alguma ferramenta nova de IA ou 
                pensando em como otimizar algum fluxo. A interseção entre tecnologia e impacto real é o que 
                me move.
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