var express=require('express');
var Router=express.Router();
var Login =require('../../controllers/Api/Login.controller');
var middleware =require('../../middleware/check_login');
Router.get('/',Login.getLogin);
module.exports=Router;