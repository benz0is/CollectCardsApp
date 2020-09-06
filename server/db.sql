CREATE TABLE users
(
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    picture TEXT,
    balance INT
);

CREATE TABLE users_info
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    ref_id TEXT NOT NULL REFERENCES users(id),
    username TEXT NOT NULL,
    picture TEXT,
    post TEXT,
    cards TEXT,
    date TEXT
);

