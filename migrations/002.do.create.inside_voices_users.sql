CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL UNIQUE,
  password VARCHAR(76) NOT NULL
);

ALTER TABLE journals
  ADD COLUMN
    author_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;