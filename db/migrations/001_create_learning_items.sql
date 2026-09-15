-- Learning Log: registro público de estudos, livros, cursos e pesquisas.
-- Idempotente: pode rodar várias vezes sem quebrar.

CREATE TABLE IF NOT EXISTS learning_items (
  id             BIGSERIAL PRIMARY KEY,
  title          TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  type           TEXT        NOT NULL DEFAULT 'study',
  status         TEXT        NOT NULL DEFAULT 'studying',
  description    TEXT,
  progress       SMALLINT,
  author         TEXT,
  cover_url      TEXT,
  external_url   TEXT,
  repository_url TEXT,
  started_at     DATE,
  completed_at   DATE,
  tags           TEXT[]      NOT NULL DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT learning_items_type_check CHECK (
    type IN ('study', 'book', 'course', 'research', 'project', 'certification', 'other')
  ),
  CONSTRAINT learning_items_status_check CHECK (
    status IN ('studying', 'reading', 'completed', 'planned', 'paused', 'dropped')
  ),
  CONSTRAINT learning_items_progress_check CHECK (
    progress IS NULL OR (progress >= 0 AND progress <= 100)
  )
);

-- Listagens filtram por status/tipo e ordenam por conclusão.
CREATE INDEX IF NOT EXISTS learning_items_status_idx      ON learning_items (status);
CREATE INDEX IF NOT EXISTS learning_items_type_idx        ON learning_items (type);
CREATE INDEX IF NOT EXISTS learning_items_completed_idx   ON learning_items (completed_at DESC NULLS LAST);

-- updated_at sempre acompanha a última escrita, sem depender da aplicação.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS learning_items_set_updated_at ON learning_items;
CREATE TRIGGER learning_items_set_updated_at
  BEFORE UPDATE ON learning_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
