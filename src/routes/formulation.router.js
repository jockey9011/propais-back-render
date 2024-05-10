const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  getAll,
  create,
  getOne,
  remove,
  update,
  uploadFile,
  downloadFile,
  deleteFile
} = require('../controllers/formulation.controllers');

const verifyJWT = require('../utils/verifyJWT');

const uploadPath = path.join(__dirname, '..', 'archivos');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Ruta para subir archivo
router.post('/formulation/upload/:id', verifyJWT, upload.array('files'), uploadFile);

router.get('/formulation/:id/download', verifyJWT, downloadFile);

router.delete('/formulation/:id/delete', verifyJWT, deleteFile);

// Rutas CRUD para formulation
router.route('/formulation')
  .get(verifyJWT, getAll)
  .post(verifyJWT, create);

router.route('/formulation/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = router;
