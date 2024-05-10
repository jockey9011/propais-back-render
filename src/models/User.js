const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('administrador', 'monitor', 'asesor', 'OSF'), 
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  document: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  documentCity: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
}

module.exports = User;
