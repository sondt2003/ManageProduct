const myModel = require('../../model/User.model');
exports.getLogin = async (req, res, next) => {
    let data = { msg: '', status: 1 }
        try {
            let checkLogin = await myModel.UserModel.findOne({ Email: req.query.Email });
            if(checkLogin!=null){
                if (checkLogin.UserName != 'undefined') {
                    if (checkLogin.Password === req.query.Password && checkLogin.Role!="Admin") {
                        data.msg = "Login Successfully";
                        data.status=200;
                        req.session.User = checkLogin;
                    } else if(checkLogin.Role=="Admin"){
                        data.msg = "Admin khong login tren App";
                    }
                    else{
                        data.msg = "Password Failed";
                    }
                    
                }
            } else {
                data.msg = "User not found";
            }
        } catch (error) {
            data.msg = "User not found"+error;
        }
        console.log(data.msg)
    res.send(data);
}
