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

CREATE TABLE fundacion(
    id_fundacion INTEGER GENERATED ALWAYS AS identity,
    nombre_fundacion VARCHAR(255) not null,
    primary key (id_fundacion)
);

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

INSERT INTO guardia (rut_guardia, nombres_guardia, apes_guardia, correo_guardia, cel_guardia, celaux_guardia, tipo_contrato_guardia, fecha_nac_guardia, fecha_contrato_guardia)
VALUES
  ('1234563434', 'Juan', 'Pérez', 'juan.perez@email.com', 123456789, 987654321, 'Completo', '1990-05-15', '2022-03-10'),
  ('2345678901', 'María', 'Gómez', 'maria.gomez@email.com', 987654321, 123456789, 'Part-Time', '1985-10-20', '2022-06-25'),
  ('3456789012', 'Carlos', 'López', 'carlos.lopez@email.com', 555555555, 111111111, 'Completo', '1995-02-18', '2022-09-30'),
  ('4567890123', 'Laura', 'Rodríguez', 'laura.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1988-07-04', '2022-11-05');

INSERT INTO enfermero (rut_enfer, nombres_enfer, apes_enfer, correo_enfer, cel_enfer, celaux_enfer, tipo_contrato_enfer, fecha_nac_enfer, fecha_contrato_enfer, turno_enfer, especialidad_enfer)
VALUES
  ('1234567890', 'Ana', 'López', 'ana.lopez@email.com', 123456789, 987654321, 'Completo', '1990-08-25', '2022-03-15', 'Mañana', 'General'),
  ('2345678901', 'Pedro', 'Martínez', 'pedro.martinez@email.com', 987654321, 123456789, 'Part-Time', '1988-11-15', '2022-05-20', 'Tarde', 'Pediatría'),
  ('3456789012', 'María', 'García', 'maria.garcia@email.com', 555555555, 111111111, 'Completo', '1995-06-10', '2022-09-30', 'Noche', 'Geriatría'),
  ('4567890123', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 999888777, 222333444, 'Part-Time', '1985-03-30', '2022-10-10', 'Mañana', 'Cardiología');

INSERT INTO visitante (rut, nombres_vis, apes_vis, email_vis, telefono_vis, direccion_vis, rut_residente)
VALUES
  ('123456789-0', 'María Rodríguez', 'López', 'maria@email.com', 56912345678, 'Calle Principal 123, Ciudad Capital', 'residente001'),
  ('987654321-2', 'Juan Pérez', 'González', 'juan@email.com', 56998765432, 'Avenida Central 456, Ciudad Grande', 'residente002'),
  ('333222111-4', 'Luisa Fernández', 'Martínez', 'luisa@email.com', 5693332221114, 'Calle Secundaria 789, Ciudad Pequeña', 'residente003');

INSERT INTO residente (rut_res, nombres_res, apes_res, genero_res, nacion_res, direccion_res, estadocivil_res, fecha_nac_res, fecha_ingreso_res, sis_prevision_res, tipo_sangre_res, enfermedad_cronica_res, desc_enfermedad_res, discapacidad_res, desc_discapacidad_res, alergias_res, desc_alergias_res, medicamentos_res, id_fundacion)
VALUES
  ('123456789-0', 'María', 'Rodríguez', 'Femenino', 'Chilena', 'Calle Principal 123, Ciudad Capital', 'Soltero', '1990-05-15', '2022-01-10', 'Fonasa', 'A+', false, NULL, false, NULL, false, NULL, 'Ibuprofeno', 1),
  ('987654321-2', 'Juan', 'Pérez', 'Masculino', 'Chileno', 'Avenida Central 456, Ciudad Grande', 'Casado', '1985-08-22', '2022-01-10', 'Isapre', 'B-', true, 'Diabetes Tipo 2', false, NULL, true, 'Alergia al polen', 'Metformina', 1),
  ('333222111-4', 'Luisa', 'Fernández', 'Femenino', 'Chilena', 'Calle Secundaria 789, Ciudad Pequeña', 'Soltero', '1995-03-10', '2022-01-10', 'Fonasa', 'O+', false, NULL, true, 'Silla de ruedas', true, 'Alergia al maní', 'Ninguno', 1);
	