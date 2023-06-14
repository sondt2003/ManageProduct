var express=require('express');
var Router=express.Router();
var Register =require('../../controllers/Api/Register.controller');
var middleware =require('../../middleware/check_login');
Router.post('/',Register.add);
module.exports=Router;