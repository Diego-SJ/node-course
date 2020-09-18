const multer = require('multer');
const path = require('path');
const Extention = require('../classes/MimeTypes');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', 'public/done'));
  },
  filename: function (req, file, cb) {
    const ext = new Extention();
    cb(
      null,
      `${file.filename}-${Date.now()}${ext.getExtention(file.mimetype)}`,
    );
  },
});

const upload = multer({
  limits: { fileSize: 4 * 1024 * 1024 },
  dest: path.join(__dirname, '../', 'public'),
  storage: storage,
});

module.exports = upload;
