const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null,'public/image/products')
    },
    filename:(req , file , cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
})

const upload = multer({storage: storage})
module.exports = upload;
