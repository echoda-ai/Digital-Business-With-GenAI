const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const path = require('path');
const { UPLOADS_BASE_DIR } = require('../constant')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationFolder = `${UPLOADS_BASE_DIR}${req.originalUrl}`;
        if (!existsSync(destinationFolder)) {
            mkdirSync(destinationFolder, { recursive: true });
        }

        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // for 5MB limit
    },
    fileFilter(req, file, callback) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return callback(null, true);
        }
        callback(new Error('Only images are allowed'));
        return undefined;
    },
});

module.exports = { upload };