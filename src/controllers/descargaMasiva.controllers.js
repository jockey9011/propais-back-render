const User = require('../models/User');
const Formulation = require('../models/Formulation');
const Caracterization = require('../models/Caracterization');
const Capitalization = require('../models/Capitalization');

const obtenerCampos = async (req, res) => {
  try {
    const descripcionesUser = await User.describe();
    const descripcionesFormulation = await Formulation.describe();
    const descripcionesCaracterization = await Caracterization.describe();
    const descripcionesCapitalization = await Capitalization.describe();

    const camposUser = Object.keys(descripcionesUser);
    const camposFormulation = Object.keys(descripcionesFormulation);
    const camposCaracterization = Object.keys(descripcionesCaracterization);
    const camposCapitalization = Object.keys(descripcionesCapitalization);

    res.json({
      campos: {
        User: camposUser,
        Formulation: camposFormulation,
        Caracterization: camposCaracterization,
        Capitalization: camposCapitalization
      }
    });
  } catch (error) {
    console.error('Error al obtener los campos:', error);
    res.status(500).json({ error: 'Error al obtener los campos' });
  }
};

// Función para convertir datos a formato CSV
const convertirAFormatoCSV = datos => {
  if (!Array.isArray(datos) || datos.length === 0) {
    return '';
  }

  const cabeceras = Object.keys(datos[0]);
  const filas = datos.map(objeto => {
    return cabeceras.map(cabecera => {
      let valor = objeto[cabecera];
      if (valor === null || valor === undefined) {
        valor = '';
      } else if (typeof valor === 'object') {
        // Si el valor es un objeto, lo convertimos a una cadena JSON
        valor = JSON.stringify(valor);
      }
      return valor.toString(); // Convertimos el valor a cadena de texto
    }).join(',');
  });

  // Combinamos las cabeceras y las filas en una sola cadena separada por saltos de línea
  return [cabeceras.join(','), ...filas].join('\n');
};

const descargarDatos = async (req, res) => {
  try {
    // Obtener datos de la tabla Users
    const users = await User.findAll();
    const usersData = users.map(user => user.dataValues);

    // Convertir datos de Users a formato CSV
    let csvData = convertirAFormatoCSV(usersData);

    // Obtener datos de la tabla Formulation
    const formulations = await Formulation.findAll();
    const formulationsData = formulations.map(formulation => formulation.dataValues);

    // Convertir datos de Formulation a formato CSV
    csvData += '\n\n' + convertirAFormatoCSV(formulationsData);

    // Obtener datos de la tabla Caracterization
    const caracterizations = await Caracterization.findAll();
    const caracterizationsData = caracterizations.map(caracterization => caracterization.dataValues);

    // Convertir datos de Caracterization a formato CSV
    csvData += '\n\n' + convertirAFormatoCSV(caracterizationsData);

    // Obtener datos de la tabla Capitalization
    const capitalizations = await Capitalization.findAll();
    const capitalizationsData = capitalizations.map(capitalization => capitalization.dataValues);

    // Convertir datos de Capitalization a formato CSV
    csvData += '\n\n' + convertirAFormatoCSV(capitalizationsData);

    // Configurar las cabeceras y enviar el archivo CSV en la respuesta
    res.set('Content-Type', 'text/csv');
    res.attachment('datos.csv');
    res.send(csvData);
  } catch (error) {
    console.error('Error al descargar los datos:', error);
    res.status(500).json({ error: 'Error al descargar los datos' });
  }
};






module.exports = {
  obtenerCampos,
  descargarDatos
};
