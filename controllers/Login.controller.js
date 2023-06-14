const myModel = require('../model/User.model');
exports.getLogin = async (req, res, next) => {
    let msg = "";
    if (req.method === 'POST') {
        try {
            let checkLogin = await myModel.UserModel.findOne({ Email: req.body.Email });
            console.log(checkLogin)
            if(checkLogin!=null){
                if (checkLogin.UserName != 'undefined') {
                    if (checkLogin.Password === req.body.Password) {
                        msg = "Login Successfully";
                        req.session.User = checkLogin;
                        return res.redirect("/user");
                    } else {
                        msg = "Password Failed";
                    }
                }
            } else {
                msg = "User not found";
            }
        } catch (error) {
            msg = "User not found"+error;
        }
        console.log("msg:" + msg);
    }
    res.render('Login/index', { title: "Login", msg: msg })
}