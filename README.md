# Portfólio de Ana Clara

> Site pessoal de **Ana Clara Pereira**, Responsible AI Senior Analyst na Accenture e engenheira da computação, com experiência em **IA generativa, agentes, RAG e construção de sistemas de IA**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

**🔗 [Ver ao vivo →](https://portfolio-ana-clara.vercel.app/)**

---

## ✨ Sobre

Portfólio pessoal que apresenta minha trajetória, projetos, stack e formas de contato. Construído como uma
SPA estática, com design em paleta lavanda/champagne, animações suaves e seções que detalham cada projeto
(problema, solução, o que implementei) em um modal interativo.

O site é bilíngue: um toggle PT/EN na navegação troca todo o conteúdo em tempo real, incluindo o que está
aberto em modais. A escolha fica salva no navegador e o idioma inicial segue a preferência do sistema.

## 🧱 Stack

- **[React 18](https://react.dev/)**: biblioteca de UI
- **[Vite 5](https://vitejs.dev/)**: build e dev server
- **[Tailwind CSS 3](https://tailwindcss.com/)**: estilização utilitária
- **[Vercel](https://vercel.com/)**: hospedagem e deploy contínuo

A internacionalização é própria, feita com Context API, sem biblioteca de i18n. As únicas dependências de
produção são `react` e `react-dom`.

## 🗂️ Seções

| Seção | Descrição |
|-------|-----------|
| **Hero** | Apresentação, cargo atual e chamadas para ação |
| **Sobre** | Trajetória, foco em Responsible AI e tecnologias |
| **Serviços** | O que ofereço |
| **Projetos** | Cards com detalhes (problema, solução, stack, imagens) em modal |
| **Stack** | Tecnologias por categoria, incluindo Responsible AI e observabilidade |
| **Acadêmico** | Timeline de iniciações científicas e docência, com lightbox de imagens |
| **Eventos** | Eventos e participações |
| **Projetos independentes** | Disponibilidade e tipos de trabalho |
| **Contato** | E-mail e redes |

## 🌐 Internacionalização

Todo o texto visível fica em [`src/i18n/translations.js`](src/i18n/translations.js), separado por idioma
(`pt` e `en`). Os componentes não têm string fixa: consomem o hook `useLanguage()`.

Dados que não mudam com o idioma (URLs, imagens, tags de tecnologia, anos) ficam nos próprios componentes e
são combinados com as traduções por índice, para não duplicar informação entre os dois idiomas.

Para adicionar ou editar um texto, basta alterar as duas versões na mesma chave.

## 🚀 Rodando localmente

> Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# clone o repositório
git clone https://github.com/anaclacp/portfolio-att.git
cd portfolio-att

# instale as dependências
npm install

# rode o servidor de desenvolvimento
npm run dev
```

O site abre em `http://localhost:5173`.

## 📦 Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |

## 📁 Estrutura

```
portfolio-att/
├── public/
│   ├── images/            # imagens usadas no site
│   └── cv.pdf
├── src/
│   ├── components/
│   │   ├── ui/            # reutilizáveis (Modal, LanguageToggle, BlurText...)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── ...            # demais seções
│   ├── i18n/
│   │   ├── translations.js    # todo o conteúdo em pt e en
│   │   └── LanguageContext.jsx # provider e hook useLanguage()
│   ├── styles/            # CSS (base, animações, componentes)
│   ├── App.jsx            # composição das seções
│   └── main.jsx           # entrypoint
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## ☁️ Deploy

Hospedado na **Vercel**. Cada push na branch `main` dispara um deploy automático.

## 📬 Contato

- **E-mail:** [anaclaracarnavalli@gmail.com](mailto:anaclaracarnavalli@gmail.com)
- **LinkedIn:** [Ana Clara Pereira](https://www.linkedin.com/in/anaclacp/)
- **GitHub:** [@anaclacp](https://github.com/anaclacp)

---

<p align="center">Feito com 💜 por Ana Clara</p>
