BEGIN;

TRUNCATE
    journals,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES
    ('maddison', '$2a$12$zd0zyv3V8gbJ6U1LTTaNQO//Rz8rlU4smytv1PBcrDzbP.Z0O9t9q');

INSERT INTO journals (author_id, content)
VALUES
    (1, 'first test journal!');


COMMIT;