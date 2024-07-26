import * as multer from 'multer';
import * as fs from 'fs';

const mystorege = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (err) {}
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
export { mystorege };
