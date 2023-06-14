const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Product')
  .then(() => console.log('Connected!')).catch((err)=>{
    console.log("lỗi kết nối csdl:"+err);
    console.log(err);
  });
module.exports={mongoose};