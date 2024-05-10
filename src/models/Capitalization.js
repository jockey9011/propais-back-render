const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Caracterization = require('./Caracterization');

const Capitalization = sequelize.define('capitalization', {
    relCaracterization: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcionNegocio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    objetivoPlanInversion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    archivoRuta: {
        type: DataTypes.TEXT, // o DataTypes.JSON si estás utilizando Sequelize v6 o superior
        allowNull: true,
        get() {
          const filePaths = this.getDataValue('archivoRuta');
          return filePaths ? JSON.parse(filePaths) : [];
        },
        set(value) {
          this.setDataValue('archivoRuta', JSON.stringify(value));
        }
      },
      capacitacion1: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      capacitacion2: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      capacitacion3: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      capacitacion4: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      capacitacion5: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      capacitacion6: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      validation1: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      validation2: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      banco: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tipoCuenta: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroCuenta: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tipoDocumento: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroIdentificacion: {
        type: DataTypes.STRING,
        allowNull: true
      },
      archivoAdjunto: {
        type: DataTypes.TEXT, // o DataTypes.JSON si estás utilizando Sequelize v6 o superior
        allowNull: true,
        get() {
          const filePaths = this.getDataValue('archivoAdjunto');
          return filePaths ? JSON.parse(filePaths) : [];
        },
        set(value) {
          this.setDataValue('archivoAdjunto', JSON.stringify(value));
        }
      },

      
      
});

Capitalization.belongsTo(Caracterization, { foreignKey: 'relCaracterization' });




module.exports = Capitalization;
