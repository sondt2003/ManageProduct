var express=require('express');
var Router=express.Router();
var User =require('../controllers/User.controller');
var middleware =require('../middleware/check_login');
Router.get('/',middleware.yeu_cau_dang_nhap,User.getUser);
Router.get('/add',middleware.yeu_cau_dang_nhap,User.add);
Router.post('/add',middleware.yeu_cau_dang_nhap,User.add);

Router.get('/edit/:idUser',middleware.yeu_cau_dang_nhap,User.edit);
Router.post('/edit/:idUser',middleware.yeu_cau_dang_nhap,User.edit);

Router.get('/delete/:idUser',middleware.yeu_cau_dang_nhap,User.delete);
module.exports=Router;