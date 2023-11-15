const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/bd_fundacion');

class Enfermero extends Model {}

Enfermero.init({
    rut_enfer: {
        type: DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING(255),
        references: {
          model: 'users', // name of the referenced table
          key: 'user_id' // key in the referenced table
        }
    },
    nombres_enfer: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    apes_enfer: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    correo_enfer: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cel_enfer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    celaux_enfer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_contrato_enfer: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fecha_nac_enfer: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_contrato_enfer: {
        type: DataTypes.DATE,
        allowNull: false
    },
    turno_enfer: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    especialidad_enfer: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    foto_enfermero: {
        type: DataTypes.STRING(300)
    }
}, { sequelize, modelName: 'enfermero', freezeTableName: true, timestamps: false });

module.exports = Enfermero;