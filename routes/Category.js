var express=require('express');
var Router=express.Router();
var Category =require('../controllers/Category.controller');
var middleware =require('../middleware/check_login');

Router.get('/',middleware.yeu_cau_dang_nhap,Category.getCategory);
Router.get('/add',middleware.yeu_cau_dang_nhap,Category.add);
Router.post('/add',middleware.yeu_cau_dang_nhap,Category.add);

Router.get('/edit/:idCategory',middleware.yeu_cau_dang_nhap,Category.edit);
Router.post('/edit/:idCategory',middleware.yeu_cau_dang_nhap,Category.edit);

Router.get('/delete/:idCategory',Category.delete);
module.exports=Router;