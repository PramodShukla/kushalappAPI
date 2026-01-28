const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

// multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB max per file
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

// universal processor
const processUploads = (moduleName) => {
  return async (req, res, next) => {
    try {
      if (!req.files) return next();

      const baseDir = path.join("uploads", moduleName);
      fs.ensureDirSync(baseDir);

      req.savedFiles = {};

      for (const field in req.files) {
        const file = req.files[field][0];

        const filename = `${field}-${Date.now()}.webp`;
        const filepath = path.join(baseDir, filename);

        await sharp(file.buffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 70 })
          .toFile(filepath);

        req.savedFiles[field] = `/uploads/${moduleName}/${filename}`;
      }

      next();
    } catch (err) {
      return res.status(400).json({
        message: "Upload failed",
        error: err.message,
      });
    }
  };
};

module.exports = { upload, processUploads };
