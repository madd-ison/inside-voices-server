BEGIN;

TRUNCATE
    journals,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES
    ('username1', '$2a$12$/3W1WcHLnZeF4liWkIjg3e63wAnUxp/hE63xDb6l73zl/oF2wvCUq');

INSERT INTO journals (author_id, content)
VALUES
    (1, 'first test journal!');


COMMIT;