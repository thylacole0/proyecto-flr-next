
-- CREAR EXTENSION EN SQL SHELL (PGADMIN)
create extension if not exists "uuid-ossp";

-- CREATE TABLE USERS
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado_user BOOLEAN NOT NULL,
    tipo_user VARCHAR(255) NOT NULL,
);
-- CREATE TABLE VISITANTE
CREATE TABLE visitante(
    rut VARCHAR(50) NOT NULL PRIMARY KEY,
    nombres_vis VARCHAR(200) NOT NULL,
    apes_vis VARCHAR(200) NOT NULL,
    email_vis VARCHAR(200) NOT NULL,
    telefono_vis NUMERIC(9) NOT NULL,
    direccion_vis VARCHAR(200) NOT NULL,
    rut_residente VARCHAR(12) NOT NULL
);

-- CREATE TABLE FUNDACION
CREATE TABLE fundacion(
    id_fundacion INTEGER GENERATED ALWAYS AS identity,
    nombre_fundacion VARCHAR(255) not null,
    primary key (id_fundacion)
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
    id_fundacion integer references fundacion(id_fundacion)
);
-- CREATE TABLE GUARDIA
CREATE TABLE guardia(
    rut_guardia VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres_guardia VARCHAR(200) NOT NULL,
    apes_guardia VARCHAR(200) NOT NULL,
    correo_guardia VARCHAR(200) NOT NULL,
    cel_guardia INTEGER NOT NULL,
    celaux_guardia INTEGER NOT NULL,
    tipo_contrato_guardia VARCHAR(20) NOT NULL,
    fecha_nac_guardia DATE NOT NULL,
    fecha_contrato_guardia DATE NOT NULL
);
-- CREATE TABLE ENFERMERO
CREATE TABLE enfermero(
    rut_enfer VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres_enfer VARCHAR(200) NOT NULL,
    apes_enfer VARCHAR(200) NOT NULL,
    correo_enfer VARCHAR(200) NOT NULL,
    cel_enfer INTEGER NOT NULL,
    celaux_enfer INTEGER NOT NULL,
    tipo_contrato_enfer VARCHAR(20) NOT NULL,
    fecha_nac_enfer DATE NOT NULL,
    fecha_contrato_enfer DATE NOT NULL,
    turno_enfer VARCHAR(20) NOT NULL,
    especialidad_enfer VARCHAR(20) NOT NULL
)


-- INSERTAR VALORES DE PRUEBA

insert into fundacion(nombre_fundacion) values ('Fundacion Las Rosas');

INSERT INTO guardia (rut_guardia, nombres_guardia, apes_guardia, correo_guardia, cel_guardia, celaux_guardia, tipo_contrato_guardia, fecha_nac_guardia, fecha_contrato_guardia)
VALUES
  ('12.345.343-4', 'Juan', 'Pérez', 'juan.perez@email.com', 123456789, 987654321, 'Completo', '1990-05-15', '2022-03-10'),
  ('23.456.890-1', 'María', 'Gómez', 'maria.gomez@email.com', 987654321, 123456789, 'Part-Time', '1985-10-20', '2022-06-25'),
  ('34.568.901-2', 'Carlos', 'López', 'carlos.lopez@email.com', 555555555, 111111111, 'Completo', '1995-02-18', '2022-09-30'),
  ('45.678.901-3', 'Laura', 'Rodríguez', 'laura.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1988-07-04', '2022-11-05'),
  ('56.789.012-4', 'Pedro', 'García', 'pedro.garcia@email.com', 123456789, 987654321, 'Completo', '1991-05-15', '2022-03-10'),
  ('67.890.123-5', 'Sofía', 'Martínez', 'sofia.martinez@email.com', 987654321, 123456789, 'Part-Time', '1986-10-20', '2022-06-25'),
  ('78.901.234-6', 'Jorge', 'López', 'jorge.lopez@email.com', 555555555, 111111111, 'Completo', '1994-02-18', '2022-09-30'),
  ('89.012.345-7', 'Luis', 'Rodríguez', 'luis.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1987-07-04', '2022-11-05'),
  ('90.123.456-8', 'Ana', 'Pérez', 'ana.perez@email.com', 123456789, 987654321, 'Completo', '1992-05-15', '2022-03-10'),
  ('01.234.567-9', 'Carla', 'Gómez', 'carla.gomez@email.com', 987654321, 123456789, 'Part-Time', '1987-10-20', '2022-06-25');

INSERT INTO enfermero (rut_enfer, nombres_enfer, apes_enfer, correo_enfer, cel_enfer, celaux_enfer, tipo_contrato_enfer, fecha_nac_enfer, fecha_contrato_enfer, turno_enfer, especialidad_enfer)
VALUES
  ('12.345.678-0', 'Ana', 'López', 'ana.lopez@email.com', 123456789, 987654321, 'Completo', '1990-08-25', '2022-03-15', 'Mañana', 'General'),
  ('23.456.789-1', 'Pedro', 'Martínez', 'pedro.martinez@email.com', 987654321, 123456789, 'Part-Time', '1988-11-15', '2022-05-20', 'Tarde', 'Pediatría'),
  ('34.567.901-2', 'María', 'García', 'maria.garcia@email.com', 555555555, 111111111, 'Completo', '1995-06-10', '2022-09-30', 'Noche', 'Geriatría'),
  ('45.678.901-2', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1985-03-30', '2022-10-10', 'Mañana', 'Cardiología'),
  ('12.345.678-1', 'Luis', 'González', 'luis.gonzalez@email.com', 123456789, 987654321, 'Completo', '1992-05-15', '2022-03-15', 'Mañana', 'General'),
  ('23.456.789-2', 'Marcela', 'Pérez', 'marcela.perez@email.com', 987654321, 123456789, 'Part-Time', '1989-11-15', '2022-05-20', 'Tarde', 'Pediatría'),
  ('34.567.890-3', 'Jorge', 'García', 'jorge.garcia@email.com', 555555555, 111111111, 'Completo', '1993-06-10', '2022-09-30', 'Noche', 'Geriatría'),
  ('45.678.901-4', 'Sofía', 'Rodríguez', 'sofia.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1987-03-30', '2022-10-10', 'Mañana', 'Cardiología'),
  ('12.345.678-2', 'Diego', 'López', 'diego.lopez@email.com', 123456789, 987654321, 'Completo', '1991-05-15', '2022-03-15', 'Mañana', 'General'),
  ('23.456.789-3', 'Carla', 'Martínez', 'carla.martinez@email.com', 987654321, 123456789, 'Part-Time', '1986-11-15', '2022-05-20', 'Tarde', 'Pediatría');

INSERT INTO visitante (rut, nombres_vis, apes_vis, email_vis, telefono_vis, direccion_vis, rut_residente)
VALUES
  ('12.345.789-0', 'María Rodríguez', 'López', 'maria@email.com', 909987654, 'Calle Principal 123, Ciudad Capital', 'residente001'),
  ('98.654.321-2', 'Juan Pérez', 'González', 'juan@email.com', 912345678, 'Avenida Central 456, Ciudad Grande', 'residente002'),
  ('33.222.111-4', 'Luisa Fernández', 'Martínez', 'luisa@email.com', 976597659, 'Calle Secundaria 789, Ciudad Pequeña', 'residente003'),
  ('12.345.789-1', 'Pedro González', 'López', 'pedro@email.com', 909987654, 'Calle Principal 123, Ciudad Capital', 'residente001'),
  ('98.654.321-3', 'Ana Sánchez', 'González', 'ana@email.com', 912345678, 'Avenida Central 456, Ciudad Grande', 'residente002'),
  ('11.222.333-4', 'Carlos Gómez', 'Hernández', 'carlos@email.com', 976597659, 'Calle Secundaria 789, Ciudad Pequeña', 'residente003'),
  ('99.888.777-6', 'Fernanda López', 'García', 'fernanda@email.com', 909987654, 'Calle Principal 123, Ciudad Capital', 'residente001'),
  ('44.555.666-7', 'Jorge Martínez', 'Pérez', 'jorge@email.com', 912345678, 'Avenida Central 456, Ciudad Grande', 'residente002'),
  ('33.444.555-6', 'Marta González', 'Sánchez', 'marta@email.com', 976597659, 'Calle Secundaria 789, Ciudad Pequeña', 'residente003'),
  ('22.333.444-5', 'Pedro Sánchez', 'González', 'pedro@email.com', 909987654, 'Calle Principal 123, Ciudad Capital', 'residente001');

INSERT INTO residente (rut_res, nombres_res, apes_res, genero_res, nacion_res, direccion_res, estadocivil_res, fecha_nac_res, fecha_ingreso_res, sis_prevision_res, tipo_sangre_res, enfermedad_cronica_res, desc_enfermedad_res, discapacidad_res, desc_discapacidad_res, alergias_res, desc_alergias_res, medicamentos_res, id_fundacion)
VALUES
  ('12.345.678-0', 'María', 'Rodríguez', 'Femenino', 'Chilena', 'Calle Principal 123, Ciudad Capital', 'Soltero', '1990-05-15', '2022-01-10', 'Fonasa', 'A+', false, NULL, false, NULL, false, NULL, 'Ibuprofeno', 1),
  ('98.765.432-2', 'Juan', 'Pérez', 'Masculino', 'Chileno', 'Avenida Central 456, Ciudad Grande', 'Casado', '1985-08-22', '2022-01-10', 'Isapre', 'B-', true, 'Diabetes Tipo 2', false, NULL, true, 'Alergia al polen', 'Metformina', 1),
  ('33.322.211-4', 'Luisa', 'Fernández', 'Femenino', 'Chilena', 'Calle Secundaria 789, Ciudad Pequeña', 'Soltero', '1995-03-10', '2022-01-10', 'Fonasa', 'O+', false, NULL, true, 'Silla de ruedas', true, 'Alergia al maní', 'Ninguno', 1),
  ('12.345.678-1', 'Pedro', 'González', 'Masculino', 'Chileno', 'Calle Principal 123, Ciudad Capital', 'Casado', '1980-05-15', '2022-01-10', 'Fonasa', 'A+', false, NULL, false, NULL, false, NULL, 'Paracetamol', 1),

  -- SELECTS DE PRUEBA

  SELECT * FROM guardia;
  SELECT * FROM enfermero;
  SELECT * FROM visitante;
  SELECT * FROM residente;
  SELECT * FROM fundacion;
  SELECT * FROM users