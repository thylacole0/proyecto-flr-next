/* CREATE TABLE VISITANTES*/

CREATE TABLE visitante(
    rut VARCHAR(50) NOT NULL PRIMARY KEY,
    nombres_vis VARCHAR(200) NOT NULL,
    apes_vis VARCHAR(200) NOT NULL,
    email_vis VARCHAR(200) NOT NULL,
    telefono_vis NUMERIC(9) NOT NULL,
    direccion_vis VARCHAR(200) NOT NULL,
    rut_residente VARCHAR(12) NOT NULL
);