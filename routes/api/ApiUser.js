var express=require('express');
var Router=express.Router();
var User =require('../../controllers/Api/User.controller');
var middleware =require('../../middleware/check_login');
Router.get('/',User.getUser);

Router.post('/add',User.add);

Router.put('/edit/:idUser',User.edit);

Router.delete('/delete/:idUser',User.delete);
module.exports=Router;