var express=require('express');
var Router=express.Router();
var Dashboard =require('../controllers/Dashboard.controller');
var middleware =require('../middleware/check_login');
Router.get('/',middleware.yeu_cau_dang_nhap,Dashboard.getDashboard);
module.exports=Router;