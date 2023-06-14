const myModel = require('../model/User.model');
exports.getRegister = (req, res, next) => {
    res.render('Register/index', { title: "Register",  msg: ""})
}
exports.add = async (req, res, next) => {
    if (req.method === 'POST') {
            console.log('Create User Successful');
            let objUser = await myModel.UserModel();
            objUser.UserName = req.body.UserName;
            objUser.Email = req.body.Email;
            objUser.Password = req.body.Password;
            objUser.Role = "User";
            try {
                let new_user = await objUser.save();
                console.log(new_user);
                console.log("Đã ghi thành công");
                req.session.User=objUser;
                return res.redirect("/user");
            } catch (error) {
                console.log(error);
            }
    }
    res.render('Register/index',{title: "Register",  msg: "" })
}