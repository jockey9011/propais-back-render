const catchError = require('../utils/catchError');
const Formulation = require('../models/Formulation');
const fs = require('fs');

const getAll = catchError(async (req, res) => {
    const results = await Formulation.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await Formulation.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Formulation.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Formulation.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updated] = await Formulation.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (!updated) return res.sendStatus(404);

    const updatedFormulation = await Formulation.findByPk(id);
    return res.json(updatedFormulation);
});

const uploadFile = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
  
      const formulation = await Formulation.findByPk(req.params.id);
      if (!formulation) {
        return res.status(404).json({ message: 'Formulation not found' });
      }
  
      let existingFilePaths = [];
  
      if (formulation.archivosFormulacion) {
        try {
          existingFilePaths = JSON.parse(formulation.archivosFormulacion);
        } catch (e) {
          console.error('Error parsing existing file paths:', e);
        }
      }
  
      const newFilePaths = req.files.map(file => file.path);
      existingFilePaths = [...existingFilePaths, ...newFilePaths];
  
      formulation.archivosFormulacion = existingFilePaths;
      await formulation.save();
  
      return res.status(200).json({ message: 'Files uploaded successfully', filePaths: existingFilePaths });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const downloadFile = async (req, res) => {
    try {
      const filePath = req.query.filePath;
      if (!filePath) {
        return res.status(400).json({ message: 'File path is required' });
      }
  
      return res.download(filePath);
    } catch (error) {
      console.error('Error downloading file:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteFile = async (req, res) => {
    try {
      const formulation = await Formulation.findByPk(req.params.id);
      if (!formulation) {
        return res.status(404).json({ message: 'Formulation not found' });
      }
  
      let existingFilePaths = [];
  
      if (formulation.archivosFormulacion) {
        try {
          existingFilePaths = JSON.parse(formulation.archivosFormulacion);
        } catch (e) {
          console.error('Error parsing existing file paths:', e);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
  
      const filePathToDelete = req.body.filePath;
  
      if (fs.existsSync(filePathToDelete)) {
        fs.unlinkSync(filePathToDelete);
      }
  
      const updatedFilePaths = existingFilePaths.filter(filePath => filePath !== filePathToDelete);
      formulation.archivosFormulacion = updatedFilePaths;
      await formulation.save();
  
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
    uploadFile,
    downloadFile,
    deleteFile
  };
