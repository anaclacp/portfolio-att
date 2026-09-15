-- Learning Log: vocabulário semântico de tipos e status.
--
-- Por que esta migration existe: type e status são validados por CHECK no banco.
-- Os novos valores (article/paper/docs, explored/finished/read/saved/in_progress)
-- seriam rejeitados pelo Postgres, então não há como representá-los sem alterar
-- as constraints. `publisher` entra junto porque editora não é autor, e separar
-- os dois é o que permite exibir "Micheal Lanham · Manning".
--
-- Idempotente: pode rodar várias vezes.

-- 1. Tipos: entram article, paper e docs.
ALTER TABLE learning_items DROP CONSTRAINT IF EXISTS learning_items_type_check;
ALTER TABLE learning_items ADD CONSTRAINT learning_items_type_check CHECK (
  type IN (
    'study', 'book', 'article', 'paper', 'docs',
    'course', 'research', 'project', 'certification', 'other'
  )
);

-- 2. Status: o vocabulário passa a distinguir assunto aberto de material com fim.
--    'completed' e 'dropped' continuam válidos (cursos e histórico antigo).
ALTER TABLE learning_items DROP CONSTRAINT IF EXISTS learning_items_status_check;
ALTER TABLE learning_items ADD CONSTRAINT learning_items_status_check CHECK (
  status IN (
    'studying',     -- assunto em estudo agora
    'explored',     -- assunto estudado recentemente (nao "terminado")
    'reading',      -- livro/artigo em leitura
    'finished',     -- livro terminado
    'read',         -- artigo/paper/doc lido
    'saved',        -- salvo para ler
    'in_progress',  -- curso em andamento
    'completed',    -- curso concluido
    'planned',      -- planejado / quero estudar
    'paused',
    'dropped'
  )
);

-- 3. Editora, separada do autor. Fica NULL para o que não é livro.
ALTER TABLE learning_items ADD COLUMN IF NOT EXISTS publisher TEXT;

-- 4. Normaliza registros antigos para o vocabulário novo.
--    "Concluído" só faz sentido para curso; livro termina, assunto é explorado.
UPDATE learning_items SET status = 'finished'
  WHERE type = 'book' AND status = 'completed';

UPDATE learning_items SET status = 'explored'
  WHERE type IN ('study', 'research') AND status = 'completed';

UPDATE learning_items SET status = 'read'
  WHERE type IN ('article', 'paper', 'docs') AND status = 'completed';

UPDATE learning_items SET status = 'in_progress'
  WHERE type IN ('course', 'certification') AND status = 'studying';
