const catchError = require('../utils/catchError');
const Capitalization = require('../models/Capitalization');
const path = require('path');
const fs = require('fs');


const getAll = catchError(async(req, res) => {
    const results = await Capitalization.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Capitalization.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Capitalization.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Capitalization.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const [updated] = await Capitalization.update(
      req.body,
      { where: { relCaracterization: id }, returning: true } // Buscar por relCaracterization
    );
    if (!updated) return res.sendStatus(404);
    
    const updatedCapitalization = await Capitalization.findOne({ where: { relCaracterization: id } });
    return res.json(updatedCapitalization);
  });
  

  const getCapitalizationByRelCaracterization = catchError(async (req, res) => {
    const { id } = req.params;
    const capitalization = await Capitalization.findOne({ where: { relCaracterization: id } });
    if (!capitalization) {
        return res.status(404).json({ message: 'Capitalization not found' });
    }
    res.json(capitalization);
});


// Controlador para subir archivos
const uploadFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
  
    const capitalization = await Capitalization.findOne({ where: { relCaracterization: req.params.id } });
    if (!capitalization) {
      return res.status(404).json({ message: 'Capitalization not found' });
    }

    // Obtener las rutas de los archivos ya almacenados
    let existingFilePaths = [];

    if (capitalization.archivoRuta) {
      try {
        existingFilePaths = JSON.parse(capitalization.archivoRuta);
      } catch (e) {
        console.error('Error parsing existing file paths:', e);
      }
    }

    // Añadir las nuevas rutas al array existente
    const newFilePaths = req.files.map(file => file.path);
    existingFilePaths = [...existingFilePaths, ...newFilePaths];

    // Convertir el array de rutas a una cadena JSON válida
    const filePathsString = JSON.stringify(existingFilePaths);

    capitalization.archivoRuta = filePathsString;
    await capitalization.save();
  
    return res.status(200).json({ message: 'Files uploaded successfully', filePaths: existingFilePaths });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const downloadFile = async (req, res) => {
  try {
    const filePath = req.query.filePath; // Obtener la ruta del query parameter
    if (!filePath) {
      return res.status(400).json({ message: 'File path is required' });
    }

    return res.download(filePath);  // Enviar el archivo como respuesta
  } catch (error) {
    console.error('Error downloading file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const deleteFile = async (req, res) => {
  try {
    const capitalization = await Capitalization.findOne({ where: { relCaracterization: req.params.id } });
    if (!capitalization) {
      return res.status(404).json({ message: 'Capitalization not found' });
    }

    let existingFilePaths = [];

    if (capitalization.archivoRuta) {
      try {
        existingFilePaths = JSON.parse(capitalization.archivoRuta);
      } catch (e) {
        console.error('Error parsing existing file paths:', e);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    const filePathToDelete = req.body.filePath;

    // Eliminar el archivo del sistema de archivos
    if (fs.existsSync(filePathToDelete)) {
      fs.unlinkSync(filePathToDelete);
    }

    // Actualizar la lista de archivos en la base de datos
    const updatedFilePaths = existingFilePaths.filter(filePath => filePath !== filePathToDelete);
    capitalization.archivoRuta = JSON.stringify(updatedFilePaths);
    await capitalization.save();

    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


  

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getCapitalizationByRelCaracterization,
    uploadFile,
    downloadFile,
    deleteFile 
};
