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
} = require('../controllers/caracterization.controllers');

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
router.post('/caracterizations/upload/:id', verifyJWT, upload.array('files'), uploadFile);

router.get('/caracterizations/:id/download', verifyJWT, downloadFile);

router.delete('/caracterizations/:id/delete', verifyJWT, deleteFile);

// Rutas CRUD para characterization
router.route('/caracterizations')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create); 

router.route('/caracterizations/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);



module.exports = router;


