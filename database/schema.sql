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