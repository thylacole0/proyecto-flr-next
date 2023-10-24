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

app.delete('/allresidentes/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const deleteResidente = await pool.query('DELETE FROM residente WHERE rut_res = $1', [rut_res]);
        res.json('Eliminado con exitoooooo');
    } catch (error) {
        console.error(error.message);
    }
});

app.put('/allresidentes/:rut_res', async (req, res) => {
    try {
        console.log(req.body)
        const { rut_res } = req.params;
        const { nombres, apellidos, direccion, estadoCivil, fechaNacimiento, medicamentos } = req.body;
        const updateResidente = await pool.query("UPDATE residente SET nombres_res = $1, apes_res = $2, direccion_res = $3, estadocivil_res = $4, fecha_nac_res = $5, medicamentos_res = $6 WHERE rut_res = $7",
        [nombres, apellidos, direccion, estadoCivil, fechaNacimiento, medicamentos, rut_res]);
        res.json('Updateado con exitoooooooo');
    } catch (error){
        console.error(error.message);
    }
})

app.put('/actualizarficharesidente/:rut_res', async (req, res) => {
    try {
        console.log(req.body)
        const { rut_res } = req.params;
        const { enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, medicamentos, alergias, descAlergias  } = req.body;
        const updateResidente = await pool.query("UPDATE residente SET enfermedad_cronica_res = $1, desc_enfermedad_res = $2, discapacidad_res = $3, desc_discapacidad_res = $4, alergias_res = $5, desc_alergias_res = $6, medicamentos_res = $7 WHERE rut_res = $8",
        [enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, medicamentos, alergias, descAlergias , rut_res]);
        res.json('Updateado con exitoooooooo');
    } catch (error){
        console.error(error.message);
    }
})


app.delete('/allguardias/:rut_guardia', async (req, res) => {
    try {
        const { rut_guardia } = req.params;
        const deleteGuardia = await pool.query('DELETE FROM guardia WHERE rut_guardia = $1', [rut_guardia]);
        res.json('Eliminado con exitoooooo');
    } catch (error) {
        console.error(error.message);
    }
})

// Registrar ficha visitante
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

// Obtener todos los visitantes
app.get('/allvisitantes', async (req, res) => {
    try {
        const allVisitantes = await pool.query('SELECT * FROM visitante');
        res.json(allVisitantes.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Obtener un visitante
app.get('/allvisitantes/:rutVis', async (req, res) => {
        
    try {
        const { rutVis } = req.params;
        console.log(rutVis)
        const visitante = await pool.query('SELECT * FROM visitante WHERE rut = $1', [rutVis]);
        res.json(visitante.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Actualizar un visitante
app.put('/allvisitantes/:rutVis', async (req, res) => {
    try {
        const { rutVis } = req.params;
        const { nombresVisitante, apellidosVisitante, emailVisitante, telefonoVisitante, direccionVisitante, rutResidente } = req.body;
        const updateVisitante = await pool.query('UPDATE visitante SET nombres_vis = $1, apes_vis = $2, email_vis = $3, telefono_vis = $4, direccion_vis = $5, rut_residente = $6 WHERE rut = $7' ,
        [nombresVisitante, apellidosVisitante, emailVisitante, telefonoVisitante, direccionVisitante, rutResidente, rutVis]);
        res.json('Updateado el visitante con exito');

    } catch (error) {
        console.error(error.message);
    }
});

// Eliminar un visitante
app.delete('/allvisitantes/:rutVis', async (req, res) => {
    try {
        const { rutVis } = req.params;
        const deleteVisitante = await pool.query('DELETE FROM visitante WHERE rut = $1', [rutVis]);
        res.json(deleteVisitante.rows);
    } catch (error) {
        console.error(error.message);
    }
});


// CRUD GUARDIAS

// Registrar ficha guardia
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

// Obtener todos los guardias
app.get('/allguardias', async (req, res) => {
    try {
        const allGuardias = await pool.query('SELECT * FROM guardia');
        res.json(allGuardias.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Obtener un guardia
app.get('/allguardias/:rut_guardia', async (req, res) => {
        
    try {
        const { rut_guardia } = req.params;
        const guardia = await pool.query('SELECT * FROM guardia WHERE rut_guardia = $1', [rut_guardia]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Actualizar un guardia
app.put('/allguardias/:rut_guardia', async (req, res) => {
    try {
        const { rut_guardia } = req.params;
        console.log(rut_guardia)
        const { nombresGuard, apellidosGuard, correoGuard, celGuard, celauxGuard, tipoContratoGuard } = req.body;
        const updateGuardia = await pool.query('UPDATE guardia SET nombres_guardia = $1, apes_guardia = $2, correo_guardia = $3, cel_guardia = $4, celaux_guardia = $5, tipo_contrato_guardia = $6 WHERE rut_guardia = $7' ,
        [nombresGuard, apellidosGuard, correoGuard, celGuard, celauxGuard, tipoContratoGuard, rut_guardia ]);
        res.json(updateGuardia.rows);
        console.log('Updateo correctamente')
    } catch (error) {
        console.error(error.message);
    }
});

// Eliminar un guardia
app.delete('/allguardias/:rut_guardia', async (req, res) => {
    try {
        const { rut_guardia } = req.params;
        const deleteGuardia = await pool.query('DELETE FROM guardia WHERE rut_guardia = $1', [rut_guardia]);
        res.json(deleteGuardia.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// CRUD ENFERMEROS

// Registrar ficha enfermero
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

// Obtener todos los enfermeros
app.get('/allenfermeros', async (req, res) => {
    try {
        const allEnfermeros = await pool.query('SELECT * FROM enfermero');
        res.json(allEnfermeros.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Obtener un enfermero
app.get('/allenfermeros/:rut_enfer', async (req, res) => {
        
    try {
        const { rut_enfer } = req.params;
        console.log(rut_enfer)
        const enfermero = await pool.query('SELECT * FROM enfermero WHERE rut_enfer = $1', [rut_enfer]);
        res.json(enfermero.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Actualizar un enfermero
app.put('/allenfermeros/:rut_enfer', async (req, res) => {
    try {
        const { rut_enfer } = req.params;
        const { nombresNurse, apellidosNurse, correoNurse, celNurse, celauxNurse, tipoContratoNurse, turnoNurse, especialidadNurse } = req.body;
        const updateEnfermero = await pool.query('UPDATE enfermero SET nombres_enfer = $1, apes_enfer = $2, correo_enfer = $3, cel_enfer = $4, celaux_enfer = $5, tipo_contrato_enfer = $6, turno_enfer = $7, especialidad_enfer = $8 WHERE rut_enfer = $9' ,
        [nombresNurse, apellidosNurse, correoNurse, celNurse, celauxNurse, tipoContratoNurse, turnoNurse, especialidadNurse, rut_enfer]);
        res.json(updateEnfermero.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Eliminar un enfermero
app.delete('/allenfermeros/:rut_enfer', async (req, res) => {
    try {
        const { rut_enfer } = req.params;
        const deleteEnfermero = await pool.query('DELETE FROM enfermero WHERE rut_enfer = $1', [rut_enfer]);
        res.json(deleteEnfermero.rows);
    } catch (error) {
        console.error(error.message);
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
        const residente = await pool.query('SELECT * FROM residente WHERE rut_res = $1', [rut_res]);
        res.json(residente.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});




module.exports = app;