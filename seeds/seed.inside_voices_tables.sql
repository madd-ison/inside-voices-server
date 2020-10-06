BEGIN;

TRUNCATE
    journals,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES
    ('maddison', 'password1');

INSERT INTO journals (author_id, content)
VALUES
    (1, 'first test journal!');


COMMIT;