'use stric';

let mimetypes = {};

module.exports = class File {
  constructor() {
    mimetypes = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/bmp': '.bmp',
      'image/tiff': '.tiff',
    };
  }

  getExtention(_mimeType) {
    if (_mimeType || typeof _mimeType !== 'undefined') {
      return mimetypes[_mimeType]
        ? mimetypes[_mimeType]
        : console.error('mime type not found');
    }
  }
};
