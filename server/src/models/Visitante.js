const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/bd_fundacion');

class Visitante extends Model {}

Visitante.init({
  rut: {
    type: DataTypes.STRING(50),
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
  nombres_vis: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  apes_vis: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  email_vis: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  telefono_vis: {
    type: DataTypes.NUMERIC(9,0),
    allowNull: false
  },
  direccion_vis: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  rut_residente: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
}, { 
  sequelize, 
  modelName: 'visitante',
  freezeTableName: true, // This will prevent Sequelize from pluralizing the table name
  timestamps: false // assuming you do not have created_at and updated_at fields in your table
});

module.exports = Visitante;