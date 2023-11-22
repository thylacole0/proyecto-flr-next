
-- CREAR EXTENSION EN SQL SHELL (PGADMIN)
create extension if not exists "uuid-ossp";

-- CREATE TABLE USERS
CREATE TABLE users(
    user_id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado_user BOOLEAN NOT NULL,
    tipo_user VARCHAR(255) NOT NULL
)

-- CREATE TABLE FUNDACION
CREATE TABLE fundacion(
    id_fundacion INTEGER GENERATED ALWAYS AS identity,
    nombre_fundacion VARCHAR(255) not null,
    primary key (id_fundacion)
);

-- CREATE TABLE VISITANTE
CREATE TABLE visitante(
    rut_vis VARCHAR(50) NOT NULL PRIMARY KEY,
    user_id VARCHAR(200) REFERENCES users(user_id),
    nombres_vis VARCHAR(200) NOT NULL,
    apes_vis VARCHAR(200) NOT NULL,
    email_vis VARCHAR(200) NOT NULL,
    telefono_vis NUMERIC(9) NOT NULL,
    direccion_vis VARCHAR(200) NOT NULL,
    rut_res VARCHAR(12)  REFERENCES residente(rut_res)
);

-- CREATE TABLE RESIDENTE
CREATE TABLE residente(
    rut_res VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres_res VARCHAR(200) NOT NULL,
    apes_res VARCHAR(200) NOT NULL,
    genero_res VARCHAR(10) NOT NULL,
    nacion_res VARCHAR(200) NOT NULL,
    direccion_res VARCHAR(200) NOT NULL,
    estadocivil_res VARCHAR(20) NOT NULL,
    fecha_nac_res DATE NOT NULL,
    fecha_ingreso_res DATE NOT NULL,
    sis_prevision_res VARCHAR(20) NOT NULL,
    tipo_sangre_res VARCHAR(10) NOT NULL,
    enfermedad_cronica_res BOOLEAN NOT NULL,
    desc_enfermedad_res VARCHAR(200),
    discapacidad_res BOOLEAN NOT NULL,
    desc_discapacidad_res VARCHAR(200),
    alergias_res BOOLEAN NOT NULL,
    desc_alergias_res VARCHAR(200),
    medicamentos_res VARCHAR(200),
    foto_res VARCHAR(300),
    id_fundacion integer references fundacion(id_fundacion)
);

-- CREATE TABLE GUARDIA
CREATE TABLE guardia(
    rut_guardia VARCHAR(13) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    nombres_guardia VARCHAR(200) NOT NULL,
    apes_guardia VARCHAR(200) NOT NULL,
    correo_guardia VARCHAR(200) NOT NULL,
    cel_guardia INTEGER NOT NULL,
    celaux_guardia INTEGER NOT NULL,
    tipo_contrato_guardia VARCHAR(20) NOT NULL,
    fecha_nac_guardia DATE NOT NULL,
    fecha_contrato_guardia DATE NOT NULL,
    foto_guardia VARCHAR(300) 
);
-- CREATE TABLE ENFERMERO
CREATE TABLE enfermero(
    rut_enfer VARCHAR(13) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(user_id),
    nombres_enfer VARCHAR(200) NOT NULL,
    apes_enfer VARCHAR(200) NOT NULL,
    correo_enfer VARCHAR(200) NOT NULL,
    cel_enfer INTEGER NOT NULL,
    celaux_enfer INTEGER NOT NULL,
    tipo_contrato_enfer VARCHAR(20) NOT NULL,
    fecha_nac_enfer DATE NOT NULL,
    fecha_contrato_enfer DATE NOT NULL,
    turno_enfer VARCHAR(20) NOT NULL,
    especialidad_enfer VARCHAR(20) NOT NULL,
    foto_enfermero VARCHAR(300)
)

CREATE TABLE bitacora (
    id_bit SERIAL PRIMARY KEY,
    fecha_bit DATE NOT NULL,
    hora_bit TIME NOT NULL,
    contenido_bit TEXT,
    rut_res VARCHAR REFERENCES residente(rut_res)
);

CREATE TABLE portafolio (
    id_portafolio SERIAL PRIMARY KEY,
    nom_documento VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL,
    archivo VARCHAR(300),
    rut_res VARCHAR REFERENCES residente(rut_res)
);

CREATE TABLE reserva (
    id_reserva SERIAL PRIMARY KEY,
    fecha_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    motivo VARCHAR(255),
    estado_reserva VARCHAR(255) NOT NULL,
    rut_vis VARCHAR(12) REFERENCES visitante(rut_vis),
    rut_res VARCHAR(12) REFERENCES residente(rut_res)
);


-- INSERTAR VALORES DE PRUEBA

insert into fundacion(nombre_fundacion) values ('Fundacion Las Rosas');

INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('enfermero01', '12345678', true, 'Enfermero');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('enfermero02', '12345678', true, 'Enfermero');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('enfermero03', '12345678', true, 'Enfermero');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('enfermero04', '12345678', true, 'Enfermero');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('enfermero05', '12345678', true, 'Enfermero');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('guardia01', '12345678', true, 'Guardia');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('guardia02', '12345678', true, 'Guardia');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('guardia03', '12345678', true, 'Guardia');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('guardia04', '12345678', true, 'Guardia');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('guardia05', '12345678', true, 'Guardia');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('visitante01', '12345678', true, 'Visitante');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('visitante02', '12345678', true, 'Visitante');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('visitante03', '12345678', true, 'Visitante');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('visitante04', '12345678', true, 'Visitante');
INSERT INTO users (username, password, estado_user, tipo_user) VALUES ('visitante05', '12345678', true, 'Visitante');

INSERT INTO enfermero VALUES ('12.345.678.-1','f8d42d67-6e0c-441e-93c4-9ddb2c88c5cd','Juan Antonio','Pérez Mujica','juan.perez@example.com',555123456,555789012,'Completo','1990-05-15','2022-01-01','Noche','Cuidados Intensivos','src\uploads\images\enfermero_1.jpg');
INSERT INTO enfermero VALUES ('15.678.912.-3','7be706e5-7f59-419f-b0ad-c239adaa954c','Pedro Luis','Martinez Ruiz','pedro.martinez@example.com',555123465,555789021,'Part-Time','1991-06-16','2022-01-02','Dia','Cuidados Paliativos','src\uploads\images\enfermero_2.jpg');
INSERT INTO enfermero VALUES ('17.891.234.-5','5fb0fd68-0ef8-4286-a4ef-eb1478c33624','Carmen Rosa','Vargas Silva','carmen.vargas@example.com',555123466,555789022,'Completo','1992-07-17','2022-01-03','Noche','Cirugia','src\uploads\images\enfermero_3.jpg');
INSERT INTO enfermero VALUES ('19.234.567.-7','f4b2a501-5028-41bc-9cc2-fb26d60cbd82','Ricardo Jose','Fernandez Castro','ricardo.fernandez@example.com',555123467,555789023,'Completo','1993-08-18','2022-01-04','Dia','Pediatría','src\uploads\images\enfermero_4.jpg');
INSERT INTO enfermero VALUES ('21.345.678.-9','7bc8cc85-078c-4043-8093-ee252d1741ae','Luisa Maria','Gonzalez Perez','luisa.gonzalez@example.com',555123468,555789024,'Practicante','1994-09-19','2022-01-05','Tarde','Geriatría','src\uploads\images\enfermero_5.jpg');

INSERT INTO guardia VALUES ('23.456.789.-1', 'ed85618b-c8bb-47d8-84c5-0624c336929a', 'Juan Carlos', 'Lopez Garcia', 'juan.lopez@example.com', 555123469, 555789025, 'Completo', '1995-10-20', '2022-01-06', 'src\uploads\images\guardia_1.jpg');
INSERT INTO guardia VALUES ('25.678.912.-3', 'e45a23c2-5065-4eef-ab1e-3eaffc6eab4f', 'Maria Teresa', 'Gomez Rodriguez', 'maria.gomez@example.com', 555123470, 555789026, 'Part-Time', '1996-11-21', '2022-01-07', 'src\uploads\images\guardia_2.jpg');
INSERT INTO guardia VALUES ('27.891.234.-5', '0c6ea7ff-64ff-45b3-a739-d0dce45c4b4c', 'Carlos Enrique', 'Vargas Silva', 'carlos.vargas@example.com', 555123471, 555789027, 'Completo', '1997-12-22', '2022-01-08', 'src\uploads\images\guardia_3.jpg');
INSERT INTO guardia VALUES ('29.123.456.-7', '8da82f47-d046-46f4-892a-4d61e503a2d7', 'Ana Patricia', 'Fernandez Castro', 'ana.fernandez@example.com', 555123472, 555789028, 'Part-Time', '1998-01-23', '2022-01-09', 'src\uploads\images\guardia_4.jpg');
INSERT INTO guardia VALUES ('31.234.567.-9', '6525f857-0b71-449e-9a4b-d3b2e9452242', 'Luis Fernando', 'Gonzalez Perez', 'luis.gonzalez@example.com', 555123473, 555789029, 'Completo', '1999-02-24', '2022-01-10', 'src\uploads\images\guardia_5.jpg');

INSERT INTO residente VALUES ('33.456.789.-1', 'Augusto Salvador', 'Ramirez Gonzalez', 'Masculino', 'Chile', 'Calle Falsa 123', 'Soltero', '1945-10-20', '2022-01-06', 'FONASA', 'O+', false, null, false, null, true, 'Polen', 'Paracetamol', 'src\uploads\images\residente_1.jpg', 1);
INSERT INTO residente VALUES ('35.678.912.-3', 'Petronila Fernanda', 'Vicuña Menotti', 'Femenino', 'Chile', 'Calle Falsa 124', 'Casado', '1950-11-21', '2022-01-07', 'ISAPRE', 'A-', true, 'Diabetes', false, null, false, null, 'Insulina', 'src\uploads\images\residente_2.jpg', 1);
INSERT INTO residente VALUES ('37.891.234.-5', 'Diego Armando', 'Maradona Rubio', 'Masculino', 'Chile', 'Calle Falsa 125', 'Viudo', '1955-12-22', '2022-01-08', 'FONASA', 'B+', false, null, true, 'Movilidad reducida', true, 'Clonazepam', 'Ibuprofeno', 'src\uploads\images\residente_3.jpg', 1);
INSERT INTO residente VALUES ('39.123.456.-7', 'Violeta Del Carmen', 'Musri Leighton', 'Femenino', 'Chile', 'Calle Falsa 126', 'Separado', '1935-01-23', '2022-01-09', 'ISAPRE', 'AB-', true, 'Hipertensión', true, 'Visual', false, null, 'Losartan', 'src\uploads\images\residente_4.jpg', 1);
INSERT INTO residente VALUES ('41.234.567.-9', 'Felipe Sebastan', 'Araos Peña', 'Masculino', 'Chile', 'Calle Falsa 127', 'Casado', '1930-02-24', '2022-01-10', 'FONASA', 'O-', false, null, false, null, true, 'Lactosa', 'Lactase', 'src\uploads\images\residente_5.jpg', 1);

INSERT INTO visitante VALUES ('53.456.789.-1', '5cfe21da-1b51-4a09-8193-53b937ff9c5c', 'Roberto Alejandro', 'Perez Sanchez', 'roberto.perez@example.com', 555123479, 'Calle Falsa 133', '33.456.789.-1');
INSERT INTO visitante VALUES ('55.678.912.-3', '7dc8da0d-4253-42ab-af4b-8d90ccf04c6a', 'Patricia Isabel', 'Gonzalez Morales', 'patricia.gonzalez@example.com', 555123480, 'Calle Falsa 134', '35.678.912.-3');
INSERT INTO visitante VALUES ('57.891.234.-5', '06a4040e-1f21-4e73-88c8-11c97bd3cf5e', 'Enrique Manuel', 'Rodriguez Fernandez', 'enrique.rodriguez@example.com', 555123481, 'Calle Falsa 135', '37.891.234.-5');
INSERT INTO visitante VALUES ('59.123.456.-7', '9db676d7-a7be-47e2-b870-1cd09f375a5a', 'Isabel Maria', 'Morales Gomez', 'isabel.morales@example.com', 555123482, 'Calle Falsa 136', '39.123.456.-7');
INSERT INTO visitante VALUES ('61.234.567.-9', '79a98043-0bb7-4a7e-9163-778fec2e1c08', 'Manuel Antonio', 'Fernandez Perez', 'manuel.fernandez@example.com', 555123483, 'Calle Falsa 137', '41.234.567.-9');
