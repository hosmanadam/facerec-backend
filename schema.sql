DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT UNIQUE NOT NULL,
    entries INT NOT NULL DEFAULT 0,
    joined TIMESTAMP NOT NULL DEFAULT NOW()
  );

DROP TABLE IF EXISTS login CASCADE;
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash TEXT NOT NULL,
    email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE
);



INSERT INTO users
    (name, email)
VALUES
     ('Adam', 'adam@gmail.com'),
     ('Sally', 'sally@gmail.com');


INSERT INTO login
    (hash, email)
VALUES
    ('$2a$10$0dQ8zYRzHST7j46L8v2Etufy5.A.ucHcEt7.ZL.pkq85/hM1z9FHe', 'adam@gmail.com'),
    ('$2a$10$RrNMZWbqEU2IknQS3H.ds.XwkRpTfPNhVZFxaP34jhLZp3DJPK79i', 'sally@gmail.com');
