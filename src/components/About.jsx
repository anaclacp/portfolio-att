function About() {
  return (
    <section id="sobre" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-12 text-center">
          Sobre <span className="accent">mim</span>
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-purple-light/20 image-container">
              <img
                src="/images/eu.jpg"
                alt="Ana Clara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-5 text-gray-300 font-body text-center md:text-left">
          <p className="text-base md:text-lg leading-relaxed">
            Sou desenvolvedora <span className="text-purple-light">Full Stack Pleno</span> com foco em
            Inteligência Artificial aplicada. Trabalho principalmente com Python, TypeScript, React,
            FastAPI, bancos de dados, APIs e integrações com LLMs.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Tenho interesse especial em criar sistemas que usam IA de forma prática: agentes, RAG,
            automações, pipelines de dados e ferramentas que resolvem problemas reais. Também estou
            sempre acompanhando novas tecnologias e estudando formas de construir soluções mais
            performáticas, escaláveis e bem estruturadas.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-400">
            Sou formada em Engenharia da Computação pela <span className="text-purple-light">UNAERP</span> e
            atuo na <span className="text-purple-light">Citel</span>, criando soluções internas e externas
            com IA integrada. O trabalho vai além disso: automação de processos, ETL, desenvolvimento e
            entrega rápida, além de montar os deploys e a observabilidade dos sistemas.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-400">
            Atualmente estou estudando <span className="text-purple-light">Go</span> e desenvolvendo o
            Go Ledger API, uma API de controle financeiro com pegada fintech, envolvendo contas, transações,
            importação de dados e processamento assíncrono.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
