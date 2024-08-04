const express = require('express');
const router = express.Router();
const BannerRepository = require('../repository/banner');
const { safeError, safeResponse } = require('../utils/response.js');
const { deleteFileIfExists } = require('../utils/helper.js');
const { upload } = require('../middleware/multer.js');
const { BACKEND_BASE_URL } = require('../constant.js');

const bannerRepository = new BannerRepository();

router.get('/', (_req, res) => bannerRepository.findAll()
    .then(banners => safeResponse(res, {
        payload: banners.map(banner => ({
            ...banner,
            image_path: `${BACKEND_BASE_URL}/${banner.image_path}`
        }))
    }))
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;


    return bannerRepository.findById(id)
        .then(banner => deleteFileIfExists(banner.image_path))
        .then(() => bannerRepository.remove(id))
        .then(() => safeResponse(res, { message: 'Banner deleted successfully' }))
        .catch((error) => safeError(res, { message: error.message }))
})

module.exports = router;