#!/bin/sh

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER bingo;
    CREATE DATABASE bingo;
    GRANT ALL PRIVILEGES ON DATABASE bingo TO bingo;
EOSQL
