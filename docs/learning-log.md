# Learning Log

Registro público de estudos, livros, cursos e pesquisas, em `/learning`, com painel
de edição em `/admin/learning`.

Os dados vivem em um Postgres no Neon. Editar pelo painel muda o banco, e a página
reflete no request seguinte: **não precisa commit nem deploy para atualizar conteúdo**.

## Como funciona

```
Neon PostgreSQL
      |
      v
Vercel Serverless Functions  (/api/learning)   <- consulta acontece aqui, no servidor
      |
      v
SPA React (/learning, /admin/learning)
```

O portfólio é uma SPA Vite, não Next.js, então no lugar de Server Actions as consultas
ficam em funções serverless da Vercel, na pasta `api/`. O browser nunca vê a
connection string: ele só fala com `/api/learning`.

## 1. Criar o banco no Neon

1. Entre em [console.neon.tech](https://console.neon.tech) e crie um projeto.
   Região mais perto do Brasil: `AWS us-east-1` ou `aws-sa-east-1`.
2. Em **Connection Details**, copie a connection string da opção **Pooled connection**.
   Ela se parece com:
   ```
   postgresql://usuario:senha@ep-nome-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. O plano gratuito basta com folga para esse uso.

## 2. Variáveis de ambiente

Copie `.env.example` para `.env` na raiz do projeto (o `.env` já está no `.gitignore`):

| Variável | Para que serve |
|----------|----------------|
| `DATABASE_URL` | Connection string do Neon |
| `ADMIN_TOKEN`  | Senha do painel `/admin/learning` |

Gere um `ADMIN_TOKEN` aleatório:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Não coloque nenhum dos dois valores no código.

## 3. Criar o schema

```bash
npm run db:migrate
```

Aplica os arquivos de `db/migrations/` em ordem. É idempotente: rodar de novo não quebra.

## 4. Dados de exemplo (opcional)

```bash
npm run db:seed        # insere 8 registros de exemplo
npm run db:seed:clean  # remove só eles
```

Todo registro de exemplo tem `slug` começando com `seed-`, então a limpeza não toca
no que você criou de verdade.

## 5. Rodar localmente

```bash
npm run dev
```

O `vite.config.js` monta as funções de `api/` como middleware do dev server, então
`/learning` e `/admin/learning` funcionam localmente contra o Neon de verdade, sem
precisar da CLI da Vercel.

Sem `DATABASE_URL`, a página abre e mostra um aviso de banco não conectado, em vez
de quebrar.

## 6. Usar o painel

1. Abra `/admin/learning`.
2. Informe o `ADMIN_TOKEN`. Ele fica guardado só na aba atual (`sessionStorage`);
   fechou a aba, pede de novo.
3. Preencha o formulário e salve.

Na lista à direita de cada registro:

- **✓** marca como concluído (status `completed`, progresso 100, data de hoje)
- **Editar** carrega o registro no formulário
- **Excluir** remove, com confirmação

### Campos

| Campo | Observação |
|-------|-----------|
| Título | obrigatório; o `slug` sai dele automaticamente |
| Tipo | `study`, `book`, `course`, `research`, `project`, `certification`, `other` |
| Status | `studying`, `reading`, `completed`, `planned`, `paused`, `dropped` |
| Progresso | inteiro de 0 a 100, ou vazio |
| Tags | separadas por vírgula |
| Repositório | aparece como "Projeto relacionado" no card |
| Capa | só aparece no formulário quando o tipo é `book` |

### Onde cada item aparece

| Seção | Regra |
|-------|-------|
| Atualmente estudando | status `studying` ou `reading`, exceto livros |
| Estudos recentes | status `completed`, mais novos primeiro |
| Bookshelf | tipo `book`, qualquer status |
| Estudos e pesquisas | tipo `course`, `research` ou `certification` |

Livro sendo lido aparece só na estante, para não duplicar.

## 7. Deploy na Vercel

O deploy continua automático a cada push. O que muda é que as variáveis precisam
existir lá também:

1. No projeto da Vercel: **Settings > Environment Variables**
2. Cadastre, marcando Production, Preview e Development:

   | Nome | Valor |
   |------|-------|
   | `DATABASE_URL` | a connection string do Neon |
   | `ADMIN_TOKEN` | o mesmo token do `.env` |

3. Refaça o deploy depois de cadastrar: variável nova não entra num build já feito.

O `vercel.json` cuida de duas coisas: manda qualquer rota que não seja `/api/*` para
o `index.html` (senão `/learning` daria 404 ao recarregar), e deixa `api/` ser servida
como função.

## Frescor dos dados

O `GET /api/learning` responde com:

```
Cache-Control: public, max-age=0, s-maxage=30, stale-while-revalidate=300
```

O CDN da Vercel guarda por 30 segundos e revalida em segundo plano por mais 5 minutos.
Uma edição aparece em até ~30 segundos, sem congelar nada no build e sem bater no
Neon a cada visita.

## Segurança

- `/learning` é público e só lê.
- Tudo que escreve (`POST`, `PATCH`, `DELETE`) exige `Authorization: Bearer <ADMIN_TOKEN>`.
- A comparação do token é feita em tempo constante, para não vazar o valor pela
  latência da resposta.
- O `/admin/learning` é apenas a interface: quem protege é a API. Abrir a URL sem
  token não dá acesso a nada.

Isso é adequado para um painel pessoal de uma pessoa só. Não tem sessão, expiração
nem múltiplos usuários. Se um dia precisar disso, troque por um provedor de auth.

## Estrutura dos arquivos

```
api/
├── _lib/
│   ├── auth.js        verificação do ADMIN_TOKEN
│   ├── db.js          queries (Neon)
│   └── validate.js    validação e normalização do payload
└── learning/
    ├── index.js       GET lista (público) / POST cria
    └── [id].js        GET / PATCH / DELETE de um item

db/
├── migrations/
│   └── 001_create_learning_items.sql
└── seed.sql

scripts/
└── db.mjs             runner de migrate/seed

src/
├── pages/
│   ├── Learning.jsx
│   └── AdminLearning.jsx
├── components/learning/
├── hooks/
└── lib/
    ├── learningApi.js       cliente HTTP
    └── learningFormat.js    datas e agrupamento das seções
```
