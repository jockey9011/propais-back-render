const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Capitalization = require('./Capitalization');

const Formulation = sequelize.define('formulation', {
    relCapitalization: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rubro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    archivosFormulacion: {
      type: DataTypes.TEXT, // o DataTypes.JSON si estás utilizando Sequelize v6 o superior
      allowNull: true,
      get() {
        const filePaths = this.getDataValue('archivosFormulacion');
        return filePaths ? JSON.parse(filePaths) : [];
      },
      set(value) {
        this.setDataValue('archivosFormulacion', JSON.stringify(value));
      }
    }
});

Formulation.belongsTo(Capitalization, { foreignKey: 'relCapitalization' });

module.exports = Formulation;