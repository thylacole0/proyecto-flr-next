const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/bd_fundacion');

class Guardia extends Model {}

Guardia.init({
  rut_guardia: {
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
  nombres_guardia: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  apes_guardia: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  correo_guardia: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  cel_guardia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  celaux_guardia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_contrato_guardia: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  fecha_nac_guardia: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_contrato_guardia: {
    type: DataTypes.DATE,
    allowNull: false
  },
  foto_guardia: {
    type: DataTypes.STRING(300),
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'guardia',
  freezeTableName: true, // This will prevent Sequelize from pluralizing the table name
  timestamps: false // assuming you do not have created_at and updated_at fields in your table
});

module.exports = Guardia;