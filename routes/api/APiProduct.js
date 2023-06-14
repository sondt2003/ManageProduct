var express = require('express');
var Router = express.Router();
var multer = require('multer');
var Product = require('../../controllers/Api/Product.controller');
var middleware =require('../../middleware/check_login');
const storage = multer.diskStorage({
    destination:'./public/data',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname+'-'+uniqueSuffix+".png")
    }
});
const upload = multer({ storage: storage });
Router.get('/', Product.getProduct);

Router.get('/details/:idProduct', Product.details);

Router.post('/add', upload.single('Image_Product'), Product.add);

Router.put('/edit/:idProduct',upload.single('Image_Product'), Product.edit);

Router.delete('/delete/:idProduct', Product.delete);

module.exports = Router;