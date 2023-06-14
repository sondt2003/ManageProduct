var express=require('express');
var Router=express.Router();
var Login =require('../controllers/Login.controller');
var middleware =require('../middleware/check_login');

Router.get('/',middleware.khong_yc_dang_nhap,Login.getLogin);
Router.post('/',middleware.khong_yc_dang_nhap,Login.getLogin);
module.exports=Router;