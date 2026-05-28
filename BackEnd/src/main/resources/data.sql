-- =========================
-- USER
-- =========================

INSERT INTO users (id, email, password, username, enabled) VALUES
    (20, 'a@gmail.com', '1234', 'usuario basico', true);

-- =========================
-- GENRES
-- =========================

INSERT INTO genres (name, description) VALUES
                                           ('Rock', 'Genero musical caracterizado por guitarras electricas y bateria fuerte'),
                                           ('Pop', 'Musica popular con estructuras pegadizas y comerciales'),
                                           ('Jazz', 'Genero con improvisacion y armonias complejas'),
                                           ('Hip Hop', 'Genero basado en ritmo, rap y cultura urbana'),
                                           ('Electronic', 'Musica producida principalmente con instrumentos electronicos');


-- =========================
-- ARTISTS
-- =========================

INSERT INTO artists (name, biography) VALUES
                                        ('The Midnight Waves', 'Banda de rock alternativo formada en 2015'),
                                        ('Luna Rivers', 'Cantante pop reconocida por sus baladas emocionales'),
                                        ('Miles Harmony', 'Saxofonista de jazz con influencia clasica'),
                                        ('Urban Pulse', 'Grupo de hip hop enfocado en letras sociales'),
                                        ('Neon Circuit', 'Productor de musica electronica y DJ internacional');

-- =========================
-- SONGS
-- =========================

INSERT INTO songs (title, image_path, audio_path, duration, uploaded_by, genre_id, artist_id) VALUES
                                        ('Kids With Guns', 'images/822398e3-e048-4d81-8553-f5ded1b8dcec.jpg', 'songs/e3e8af79-4da8-44d0-9254-0c73a04cfe8b.mp3', 226.49593, 20, 1,2),
                                        ('Senza Mamma', 'images/9722a2dd-c8ad-4507-be08-e9caecce35cf.jpg', 'songs/69f3c7fa-63e4-47ab-a5ed-bd9955e51119.mp3', 154.2603, 20, 3,3);


SELECT * FROM users;

SELECT uploaded_by FROM songs;