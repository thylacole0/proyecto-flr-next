const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const pool = require("./database/db.js");

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(cors())

// RUTAS //

app.use("/auth", authRouter)

app.use("/main", require("./routes/main.js"))

// CRUD VISITANTES
app.post('/form_visitante', async (req, res) => {
    try {
        // creando el body del request
        const { rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado } = req.body;
        // insertando los datos en la tabla visitante
        const newVisitante = await pool.query('INSERT INTO visitante (rut, nombres_vis, apes_vis, email_vis, telefono_vis, direccion_vis, rut_residente) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado]);
        // retornando el nuevo visitante
        res.json(newVisitante.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// CRUD GUARDIAS
app.post('/form_guardia', async (req, res) => {

    try {
        //creando el body del request
        const { rutGuard, nombresGuard, apellidosGuard, correoGuard, fechaNacimientoGuard, celGuardia, celauxGuardia, fechaContratoGuard, contratoGuardia } = req.body;
        // insertando los datos en la tabla guardia
        const newGuardia = await pool.query('INSERT INTO guardia (rut_guardia, nombres_guardia, apes_guardia, correo_guardia, cel_guardia, celaux_guardia,fecha_nac_guardia, fecha_contrato_guardia, tipo_contrato_guardia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [rutGuard, nombresGuard, apellidosGuard, correoGuard, celGuardia, celauxGuardia, fechaNacimientoGuard, fechaContratoGuard, contratoGuardia]);
        // retornando el nuevo guardia
        res.json(newGuardia.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

// CRUD ENFERMEROS
app.post('/form_nurse', async (req, res) => {
    try {
    // creando el body del request
    const { rutNurse, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurseValue, turnoNurseValue, especialidadNurse } = req.body;
    //insertando los datos en la tabla enfermero con estos datos: 
    const newEnfermero = await pool.query('INSERT INTO enfermero (rut_enfer, nombres_enfer, apes_enfer, correo_enfer, cel_enfer, celaux_enfer, fecha_nac_enfer, fecha_contrato_enfer, tipo_contrato_enfer, turno_enfer, especialidad_enfer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *',
    [rutNurse, nombresNurse, apellidosNurse, correoNurse, celNurse, celauxNurse, fechaNacimientoNurse, fechaContratoNurse, contratoNurseValue, turnoNurseValue, especialidadNurse]);
    // retornando el nuevo enfermero
    res.json(newEnfermero.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



// CRUD RESIDENTES

// Registrar ficha residente
app.post('/form_residente', async (req, res) => {
    try {
        // creando el body del request
        const { rut, nombres, apellidos, fechaNacimiento, genero, nacionalidadRes, direccion, estadoCivil, 
            fechaIngreso, sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad, 
            discapacidad, descDiscapacidad, medicamentos, alergias, descAlergias  } = req.body;

        const newResidente = await pool.query ('INSERT INTO residente(rut_res, nombres_res, apes_res, genero_res, nacion_res, direccion_res,' + 
        ' estadocivil_res, fecha_nac_res, fecha_ingreso_res, sis_prevision_res, tipo_sangre_res, enfermedad_cronica_res, desc_enfermedad_res,' + 
        ' discapacidad_res, desc_discapacidad_res, alergias_res, desc_alergias_res, medicamentos_res, id_fundacion)'+ 
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *',
        [rut, nombres, apellidos, genero, nacionalidadRes, direccion, estadoCivil, fechaNacimiento, fechaIngreso,
         sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos, 1]);
        // retornando el nuevo residente
        res.json(newResidente.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Obtener todos los residentes
app.get('/allresidentes', async (req, res) => {
    try {
        const allResidentes = await pool.query('SELECT * FROM residente');
        res.json(allResidentes.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Obtener un residente
app.get('/allresidentes/:rut_res', async (req, res) => {
        
    try {
        const { rut_res } = req.params;
        console.log(rut_res)
        const residente = await pool.query('SELECT * FROM residente WHERE rut_res = $1', [rut_res]);
        res.json(residente.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Actualizar un residente
app.put('/allresidentes/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const { nombres, apellidos, direccion, estadoCivil, fechaNacimiento, medicamentos } = req.body;
        const updateResidente = await pool.query('UPDATE residente SET nombres_res = $1, apes_res = $2, direccion_res = $3, estadocivil_res = $4, fecha_nac_res = $5, medicamentos_res = $6 WHERE rut_res = $7' ,
        [nombres, apellidos, direccion, estadoCivil, fechaNacimiento, medicamentos, rut_res]);
        res.json(updateResidente.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Eliminar un residente
app.delete('/allresidentes/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const deleteResidente = await pool.query('DELETE FROM residente WHERE rut_res = $1', [rut_res]);
        res.json(deleteResidente.rows);
    } catch (error) {
        console.error(error.message);
    }
});


module.exports = app;