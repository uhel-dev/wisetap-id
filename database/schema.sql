create database ok_inspections_qr_codes;
use ok_inspections_qr_codes;

-- Create table
CREATE TABLE qrcodes (
    id VARCHAR(200) PRIMARY KEY DEFAULT (UUID()),
);

-- Insert 10 new entries
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);
INSERT INTO qrcodes (id, assigned) VALUES (UUID(), FALSE);





CREATE TABLE inspection_forms (
    id VARCHAR(36),
    content LONGTEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES qrcodes(id)
);












CREATE TABLE public.categories (
                                   categoryId SERIAL PRIMARY KEY,
                                   displayName VARCHAR(255) NOT NULL
);
CREATE TABLE public.subcategories (
                                      subcategoryId SERIAL PRIMARY KEY,
                                      categoryId INT NOT NULL,
                                      displayName VARCHAR(255) NOT NULL,
                                      FOREIGN KEY (categoryId) REFERENCES public.categories(categoryId)
);
CREATE TABLE public.businesses (
                                   businessId SERIAL PRIMARY KEY,
                                   subcategoryId INT NOT NULL,
                                   businessInfo JSONB,
                                   FOREIGN KEY (subcategoryId) REFERENCES public.subcategories(subcategoryId)
);
