CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password VARCHAR(76) NOT NULL,
  nickname TEXT
);

ALTER TABLE journals
  ADD COLUMN
    author_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;