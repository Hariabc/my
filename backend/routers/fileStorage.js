const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dm5lybuz2',
    api_key: '597835382986128',
    api_secret: '-sBIkEsD5FzXbHqHKZIYFItle6g',
  });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images', // Set your desired folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Add your desired allowed formats
  },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
