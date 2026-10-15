import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '../../public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer disk storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const uniqueName = `desirasoi_${Date.now()}_${cleanBase}${ext}`;
    cb(null, uniqueName);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type. Only JPG, PNG, WEBP, and GIF images are allowed.');
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter
});

const router = express.Router();

// Single image upload
router.post('/single', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'Image file size exceeds the 10MB limit.'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'Error uploading file'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided in upload request.'
      });
    }

    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  });
});

// Multiple gallery images upload
router.post('/multiple', (req, res, next) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'One or more files exceed the 10MB file size limit.'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'Error uploading files'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No image files provided in upload request.'
      });
    }

    const uploaded = req.files.map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
      size: f.size
    }));

    res.json({
      success: true,
      urls: uploaded.map(u => u.url),
      files: uploaded
    });
  });
});

// Safe removal of an uploaded file (prevents deleting default sample assets)
router.delete('/delete', (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'File URL is required' });
  }

  // Security check: Only allow deleting files inside /uploads/
  if (!url.startsWith('/uploads/')) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete default catalog assets outside the uploads directory.'
    });
  }

  const filename = path.basename(url);
  const targetPath = path.join(uploadsDir, filename);

  // Prevent path traversal
  if (!targetPath.startsWith(uploadsDir)) {
    return res.status(400).json({ success: false, error: 'Invalid path' });
  }

  if (fs.existsSync(targetPath)) {
    try {
      fs.unlinkSync(targetPath);
      return res.json({ success: true, message: 'File deleted from storage' });
    } catch (e) {
      return res.status(500).json({ success: false, error: 'Failed to delete file from disk' });
    }
  }

  res.json({ success: true, message: 'File already absent' });
});

export default router;
