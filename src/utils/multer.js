const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'archivos/');
    cb(null, uploadPath); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nombre original del archivo
  }
});

module.exports = multer({ storage: storage }).single('file');

