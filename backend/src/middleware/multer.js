import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './images.upload/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage}).single('image');

export default upload