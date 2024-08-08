import path from "path";
import url from "url";

const fileupload = (req, res, next) => {
    const file = req.files.myImg;
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirPath = path.join(__dirname, "../upload/");
    const pathT = dirPath + file.name;
    file.mv(pathT, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res = dirPath;
        next();
    });
};

export default fileupload;
