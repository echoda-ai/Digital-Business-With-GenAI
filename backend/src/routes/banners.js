const express = require('express');
const router = express.Router();
const BannerRepository = require('../repository/banner');
const { safeError, safeResponse } = require('../utils/response.js');
const { upload } = require('../middleware/multer.js');

const bannerRepository = new BannerRepository();

router.get('/', (_req, res) => bannerRepository.findAll()
    .then(categories => safeResponse(res, { payload: categories }))
    .catch((error) => safeError(res, { message: error.message }))
)

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file)
    const { path, mimetype, size } = req.file;

    const payload = {
        image_path: path,
        image_type: mimetype,
        image_size: size,
    }

    return bannerRepository.insert(payload)
        .then(() => res.send({ message: 'Banner uploaded successfully' }))
        .catch((error) => safeError(res, { message: error.message }))
})

module.exports = router;