import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename  =  fileURLToPath(import.meta.url);
const __dirname   =  path.dirname(__filename)      ;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname,'../uploads');
        cb(null, uploadDir);
        },
    filename: (req, file, cb) => {
        cb(null , file.originalname);
    }
});

const upload = multer({ storage }) ;


export default upload ;