var express=require('express');
var Router=express.Router();
var Category =require('../../controllers/Api/Category.controller');
var middleware =require('../../middleware/check_login');
Router.get('/',Category.getCategory);

Router.post('/add',Category.add);

Router.put('/edit/:idCategory',Category.edit);

Router.delete('/delete/:idCategory',Category.delete);
module.exports=Router;