#!/bin/sh

psql -v ON_ERROR_STOP=1 --username "bingo" --dbname "bingo" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
