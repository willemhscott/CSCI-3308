CREATE DATABASE final;

CREATE TABLE reviews (
    id SERIAL,
    movie_title text NOT NULL,
    review text NOT NULL,
    review_date date DEFAULT now() NOT NULL
);
