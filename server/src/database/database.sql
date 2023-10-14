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
    medicamentos_res BOOLEAN NOT NULL,
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