CREATE TABLE journals (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title DATE NOT NULL DEFAULT CURRENT_DATE,
    content TEXT
);

