BEGIN;

TRUNCATE
    journals,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (username, full_name, password, nickname)
VALUES
    ('maddison', 'Maddison M', 'password1', null);

INSERT INTO journals (author_id, content)
VALUES
    (1, 'first test journal!');


COMMIT;