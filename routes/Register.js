var express=require('express');
var Router=express.Router();
var Register =require('../controllers/Register.controller');
var middleware =require('../middleware/check_login');
Router.get('/',middleware.khong_yc_dang_nhap,Register.getRegister);
Router.post('/',middleware.khong_yc_dang_nhap,Register.add);
module.exports=Router;