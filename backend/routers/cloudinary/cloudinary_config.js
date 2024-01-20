// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// cloudinary.config({
//     cloud_name: 'dm5lybuz2',
//     api_key: '597835382986128',
//     api_secret: '-sBIkEsD5FzXbHqHKZIYFItle6g',
//   });
  

// const storage = multer.memoryStorage(); // Store files in memory

// const upload = multer({ storage });

// const uploadToCloudinary = (req, res, next) => {
//   upload.single('documents')(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'Error uploading documents' });
//     }

//     cloudinary.uploader.upload_stream(
//       {
//         folder: 'eportal',
//         resource_type: 'auto',
//       },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ message: 'Error uploading to Cloudinary' });
//         }

//         req.body.documents = [{ document_name: req.file.originalname, document_path: result.secure_url }];
//         next();
//       }
//     )(req.file);
//   });
// };

// module.exports = uploadToCloudinary;