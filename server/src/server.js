const express = require("express");
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const authRouter = require("./routes/auth.js");
const pool = require("./database/db.js");
const path = require('path');
const app = express()
const PORT = 8080;
const Enfermero = require('./models/Enfermero');
const Guardia = require('./models/Guardia');
const Visitante = require('./models/Visitante');
app.use(express.json())
app.use(cors())

// RUTAS //

app.use("/auth", authRouter)

app.use("/main", require("./routes/main.js"))

app.get('/datosvisitante/:username' , async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.query('SELECT * FROM visitante WHERE user_id = (SELECT user_id FROM users WHERE username = $1)',
        [ username ]);
        console.log(result.rows[0])
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


// SET UP MULTER FOR FILE UPLOAD

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      if (file.mimetype === 'application/pdf') {
        cb(null, 'src/uploads/documents/')
      } else if (file.mimetype.startsWith('image/')) {
        cb(null, 'src/uploads/images/')
      } else {
        cb({message: 'Este formato de archivo no es soportado'}, false)
      }
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.use('/static', express.static(path.join(__dirname, 'uploads')))

// API para las bitacoras

app.get('/bitacora_res/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const allBitacoras = await pool.query('SELECT * FROM bitacora WHERE rut_res = $1', [rut_res]);
        console.log(allBitacoras.rows)
        res.json(allBitacoras.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

const transporter = nodemailer.createTransport({
    host: 'localhost', // El host de MailHog
    port: 1025, // El puerto de SMTP de MailHog
    ignoreTLS: true, // Ignora TLS en un entorno de desarrollo
});

app.post('/bitacora_res', async (req, res) => {
    const { fecha_bit, hora_bit, contenido_bit, rut_res } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO bitacora (fecha_bit, hora_bit, contenido_bit, rut_res) VALUES ($1, $2, $3, $4) RETURNING *',
        [fecha_bit, hora_bit, contenido_bit, rut_res]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

app.get('/reservation/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const allReservas = await pool.query('SELECT * FROM reserva WHERE rut_res = $1', [rut_res]);
        res.json(allReservas.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

app.post('/reserva', async (req, res) => {
    const { fecha_reserva, hora_reserva, estado_reserva, rut_vis, rut_res } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO reserva (fecha_reserva, hora_reserva,estado_reserva, rut_vis, rut_res) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [fecha_reserva, hora_reserva,estado_reserva, rut_vis, rut_res]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
})

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

app.put('/updatereserva/:id_reserva', async (req, res) => {
    try {
        console.log(req.body)
        const { id_reserva } = req.params;
        const { estado_reserva, motivoRes } = req.body;
        const updateReserva = await pool.query("UPDATE reserva SET estado_reserva = $1, motivo = $2 WHERE id_reserva = $3",
        [estado_reserva, motivoRes, id_reserva]);
        res.json('Reserva actualizada con éxito');
    } catch (error){
        console.error(error.message);
    }
})

app.put('/assistreserva/:id_reserva', async (req, res) => {
    try {
        console.log(req.body)
        const { id_reserva } = req.params;
        const { estado_reserva} = req.body;
        const updateReserva = await pool.query("UPDATE reserva SET estado_reserva = $1 WHERE id_reserva = $2",
        [estado_reserva, id_reserva]);
        res.json('Reserva actualizada con éxito');
    } catch (error){
        console.error(error.message);
    }
})

app.put('/actualizarficharesidente/:rut_res', async (req, res) => {
    try {
        console.log(req.body)
        const { rut_res } = req.params;
        const { enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos  } = req.body;
        const updateResidente = await pool.query("UPDATE residente SET enfermedad_cronica_res = $1, desc_enfermedad_res = $2, discapacidad_res = $3, desc_discapacidad_res = $4, alergias_res = $5, desc_alergias_res = $6, medicamentos_res = $7 WHERE rut_res = $8",
        [enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos, rut_res]);
        console.log(updateResidente.rowCount);
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
        const { rutVisit, usuarioId, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado } = req.body;
        console.log(req.body)
        // insertando los datos en la tabla visitante
        const newVisitante = await pool.query('INSERT INTO visitante (rut_vis, user_id, nombres_vis, apes_vis, email_vis, telefono_vis, direccion_vis, rut_res) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [rutVisit, usuarioId, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado]);
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
app.post('/form_guardia', upload.single('fotoGuard'), async (req, res) => {
    try {
        // Creando el body del request
        const { rutGuard, nombresGuard, apellidosGuard, correoGuard, fechaNacimientoGuard, celGuardia, celauxGuardia, fechaContratoGuard, contratoGuard, usuarioId } = req.body;
        // Obtén la ruta de la imagen subida desde req.file.path
        const rutaImagen = req.file.path;
        // Insertando los datos en la tabla guardia, incluyendo la ruta de la imagen
        const newGuardia = await pool.query('INSERT INTO guardia (rut_guardia, nombres_guardia, apes_guardia, correo_guardia, cel_guardia, celaux_guardia, fecha_nac_guardia, fecha_contrato_guardia, tipo_contrato_guardia, foto_guardia, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [rutGuard, nombresGuard, apellidosGuard, correoGuard, celGuardia, celauxGuardia, fechaNacimientoGuard, fechaContratoGuard, contratoGuard, rutaImagen, usuarioId]);
        // Retornando el nuevo guardia
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
app.post('/form_nurse', upload.single('fotoNurse'), async (req, res) => {
    try {
    // creando el body del request
    const { rutNurse, usuarioId, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurse, turnoNurse, especialidadNurse } = req.body;
    //insertando los datos en la tabla enfermero con estos datos: 
    console.log(req.body)
    const rutaImagen = req.file.path;
    const newEnfermero = await pool.query('INSERT INTO enfermero (rut_enfer, nombres_enfer, apes_enfer, correo_enfer, fecha_nac_enfer, cel_enfer, celaux_enfer, fecha_contrato_enfer, tipo_contrato_enfer, turno_enfer, especialidad_enfer, foto_enfermero, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13) RETURNING *',
    [rutNurse, nombresNurse, apellidosNurse, correoNurse, fechaNacimientoNurse, celNurse, celauxNurse, fechaContratoNurse, contratoNurse, turnoNurse, especialidadNurse, rutaImagen, usuarioId]);
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
app.post('/form_residente', upload.single('fotoRes'), async (req, res) => {
    try {
        // creando el body del request
        const { rut, nombres, apellidos, fechaNacimiento, genero, nacionalidadRes, direccion, estadoCivil, 
            fechaIngreso, sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad, 
            discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos  
        } = req.body;

        const rutaImagen = req.file.path;

        const newResidente = await pool.query ('INSERT INTO residente(rut_res, nombres_res, apes_res, genero_res, nacion_res, direccion_res,' + 
        ' estadocivil_res, fecha_nac_res, fecha_ingreso_res, sis_prevision_res, tipo_sangre_res, enfermedad_cronica_res, desc_enfermedad_res,' + 
        ' discapacidad_res, desc_discapacidad_res, alergias_res, desc_alergias_res, medicamentos_res, foto_res, id_fundacion)'+ 
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
        [rut, nombres, apellidos, genero, nacionalidadRes, direccion, estadoCivil, fechaNacimiento, fechaIngreso,
         sisPrevision, tipoSangreRes, enfermedadCronica, descEnfermedad, discapacidad, descDiscapacidad, alergias, descAlergias, medicamentos, rutaImagen, 1]);
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

app.post('/upload', upload.array('file', 1), async (req, res) => {
    try {
        const { originalname, path } = req.files[0];
        const { rut_res} = req.body;
        console.log(rut_res)
        const newDocument = await pool.query(
            'INSERT INTO portafolio (nom_documento, fecha_creacion, archivo, rut_res) VALUES ($1, $2, $3, $4) RETURNING *',
            [originalname, new Date(), path, rut_res]
        );

        res.json(newDocument.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

app.get('/files/:rut_res', async (req, res) => {
    try {
        const { rut_res } = req.params;
        const allDocuments = await pool.query('SELECT * FROM portafolio WHERE rut_res = $1', [rut_res]);

        res.json(allDocuments.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

app.delete('/files/:id_portafolio', async (req, res) => {
    try {
        const { id_portafolio } = req.params;
        const deleteDocument = await pool.query('DELETE FROM portafolio WHERE id_portafolio = $1', [id_portafolio]);

        if (deleteDocument.rowCount === 0) {
            // No se encontró ningún archivo con el ID proporcionado
            res.status(404).send('File not found');
        } else {
            // El archivo se borró correctamente
            res.status(200).send('File deleted');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    // Buscar en todas las tablas relevantes
    const enfermero = await Enfermero.findOne({
        where: {
          correo_enfer: email,
        },
    });
      
    const guardia = await Guardia.findOne({
        where: {
          correo_guardia: email,
        },
    });
      
    const visitante = await Visitante.findOne({
        where: {
          email_vis: email,
        },
    });
  
    // Si no se encontró el correo electrónico en ninguna tabla
    if (!enfermero && !guardia && !visitante) {
      return res.status(404).json({ error: 'Correo electrónico no encontrado.' });
    }

    // Generar token
    const token = crypto.randomBytes(20).toString('hex');

    // Configurar transporte de correo
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //     user: 'felipecagon1234@gmail.com',
    //     pass: 'Ignacio10@',
    //     },
    // });

    console.log('xd', email)
    // Configurar opciones de correo
    const mailOptions = {
        to: email,
        from: 'felipecagon1234@gmail.com',
        subject: 'Restablecimiento de contraseña',
        text: `Por favor, para restablecer tu contraseña haz clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:\n\nhttp://${req.headers.host}/cambiar_contrasenia/${token}\n\nSi no solicitaste esto, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n`,
    };

    // Enviar correo
    transporter.sendMail(mailOptions, (err) => {
        if (err) return res.status(500).json({ error: 'Error al enviar el correo.' });
        res.status(200).json({ message: 'Correo enviado.' });
    });
  
});

app.get('/download/:filetype/:id_portafolio', async(req, res) => {
    const id_portafolio = req.params.id_portafolio;

    try {
        const result = await pool.query('SELECT archivo FROM portafolio WHERE id_portafolio = $1', [id_portafolio]);
        archivo = result.rows[0].archivo;
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

    let nombre_archivo = archivo.replace('src\\','');
    const filepath = path.join(__dirname, nombre_archivo);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist');
            res.status(404).send('File not found');
        } else {
            res.download(filepath); // Set disposition and send it.
        }
    });
});




module.exports = app;