# Portfólio — Ana Clara

> Site pessoal de **Ana Clara Pereira** — desenvolvedora Full Stack Pleno com foco em **Inteligência Artificial aplicada**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

**🔗 [Ver ao vivo →](https://portfolio-ana-clara.vercel.app/)**

---

## ✨ Sobre

Portfólio pessoal que apresenta minha trajetória, projetos, stack e formas de contato. Construído como uma
SPA estática, com design em paleta lavanda/champagne, animações suaves e seções que detalham cada projeto
(problema → solução → o que implementei) em um modal interativo.

## 🧱 Stack

- **[React 18](https://react.dev/)** — biblioteca de UI
- **[Vite 5](https://vitejs.dev/)** — build e dev server
- **[Tailwind CSS 3](https://tailwindcss.com/)** — estilização utilitária
- **[Vercel](https://vercel.com/)** — hospedagem e deploy contínuo

## 🗂️ Seções

| Seção | Descrição |
|-------|-----------|
| **Hero** | Apresentação e chamadas para ação |
| **Sobre** | Trajetória, foco e tecnologias |
| **Serviços** | O que ofereço |
| **Projetos** | Cards com detalhes (problema, solução, stack, imagens) em modal |
| **Stack** | Tecnologias por categoria |
| **Acadêmico** | Timeline de iniciações científicas e docência, com lightbox de imagens |
| **Eventos** | Eventos e participações |
| **Freelance** | Trabalhos e disponibilidade |
| **Contato** | E-mail e redes |

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
│   └── images/            # imagens usadas no site
├── src/
│   ├── components/
│   │   ├── ui/            # componentes reutilizáveis (Modal, Background, BlurText...)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── ...            # demais seções
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
