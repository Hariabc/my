const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary_config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eportal', // Replace with your desired folder name
    format: async (req, file) => 'png', // Example: always upload as PNG
  },
});

const multerConfig = multer({ storage: storage });

module.exports = multerConfig;
