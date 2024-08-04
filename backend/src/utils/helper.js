const fs = require('fs');

const deleteFileIfExists = (filePath) => fs.stat(filePath, (_err, stats) => {
    if (stats) {
        fs.unlink(filePath, (err) => {
            if (err) {
                throw new Error(err.message);
            }
        });
    }
});

module.exports = { deleteFileIfExists };