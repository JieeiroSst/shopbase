#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "postgres_db" <<-EOSQL
    CREATE ROLE events WITH LOGIN PASSWORD 'events_db';
    CREATE DATABASE "events-api" OWNER = events;
    GRANT ALL PRIVILEGES ON DATABASE "events-api" TO events;
EOSQL       