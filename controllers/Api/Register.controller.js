const myModel = require('../../model/User.model');
exports.add = async (req, res, next) => {
    let data = { msg: '', status: 1 }
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
            req.session.User = objUser;
            data.msg="Đã ghi thành công";
            data.status=201;
        } catch (error) {
            console.log(error);
            data.msg=error;
        }
    console.log("UserName:" + req.body.UserName + "\n Email:" + req.body.Email + "\n Password:" + req.body.Password+":"+req.body.ConfirmPassword);
    res.json(data);
}