const multer = require('multer');
const path = require('path');

const configureMulter = (destinationFolder) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `src/uploads/${destinationFolder}/`); 
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 10 } 
    }).single('image'); 

    return upload;
};

module.exports = { configureMulter };
