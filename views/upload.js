const multer = require("multer");
const path = require("path");

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads")); // ✅ save inside /public/uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter (only allow CV file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, .docx files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
