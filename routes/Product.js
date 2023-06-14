var express = require('express');
var Router = express.Router();
var multer = require('multer');
var Product = require('../controllers/Product.controller');
var middleware =require('../middleware/check_login');
const storage = multer.diskStorage({
    destination:'./public/data',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname+'-'+uniqueSuffix+".png")
    }
});
const upload = multer({ storage: storage });
Router.get('/',middleware.yeu_cau_dang_nhap, Product.getProduct);
Router.get('/add',middleware.yeu_cau_dang_nhap, Product.add);
Router.post('/add',middleware.yeu_cau_dang_nhap, upload.single('Image_Product'), Product.add);
Router.get('/edit/:idProduct',middleware.yeu_cau_dang_nhap, Product.edit);

Router.post('/edit/:idProduct',middleware.yeu_cau_dang_nhap,upload.single('Image_Product'), Product.edit);

Router.get('/details/:idProduct',middleware.yeu_cau_dang_nhap, Product.details);
Router.get('/delete/:idProduct',middleware.yeu_cau_dang_nhap, Product.delete);
module.exports = Router;