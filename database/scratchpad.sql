-- SELECT redirect_url from qrcodes WHERE id='https://id.wisetap.co.uk/dea32e72-8db4-4b41-885c-11032b5713ba'
-- SELECT * FROM qrcodes WHERE registered = false
-- CREATE SEQUENCE my_sequence START 1;
-- UPDATE qrcodes
-- SET redirect_url = 'https://24h-tyres.co.uk', registered = TRUE
-- WHERE code = '70d71b33-fbbd-49a8-b079-6d668744201f' AND registered = FALSE;

-- CREATE SEQUENCE my_sequence START 1;
--



create table public.qrcodes
(
    id SERIAL,
    code TEXT PRIMARY KEY NOT NULL ,
    redirect_url TEXT,
    encoded_qr_image TEXT,
    registered BOOLEAN DEFAULT FALSE NOT NULL,
    used BOOLEAN DEFAULT FALSE NOT NULL,
    type TEXT
);
