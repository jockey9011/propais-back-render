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
    getCapitalizationByRelCaracterization, 
    uploadFile,
    downloadFile,
    deleteFile 
} = require('../controllers/capitalization.controllers');

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
router.post('/capitalization/upload/:id', verifyJWT, upload.array('files'), uploadFile);

router.get('/capitalization/:id/download', verifyJWT, downloadFile);

router.delete('/capitalization/:id/delete', verifyJWT, deleteFile);



// Rutas CRUD para capitalization
router.route('/capitalization')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create); 

router.route('/capitalization/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

// Ruta para obtener capitalization por relCaracterization
router.get('/capitalization/relCaracterization/:id', verifyJWT, getCapitalizationByRelCaracterization);

module.exports = router;
