const myModel = require('../model/User.model');
let checkSort = [
    sortID = true,
    sortUserName = true,
    sortEmail = true,
    sortPassword = true,
    sortRole = true,
];
exports.getUser = async (req, res, next) => {
    let condition = null;
    let sort = null;
    if (typeof (req.query.UserName) != 'undefined') {
        let username = req.query.UserName;
        condition = { UserName: username };
    }
    if (typeof (req.query.sort) != 'undefined') {
        switch (req.query.sort) {
            case "_id":
                checkSort.sortID = !checkSort.sortID;
                checkSort.sortID ? sort = { _id: 1 } : sort = { _id: -1 };
                break;
            case "UserName":
                checkSort.sortUserName = !checkSort.sortUserName;
                checkSort.sortUserName ? sort = { UserName: 1 } : sort = { UserName: -1 };
                break;
            case "Email":
                checkSort.sortEmail = !checkSort.sortEmail;
                checkSort.sortEmail ? sort = { Email: 1 } : sort = { Email: -1 };
                break;
            case "Password":
                checkSort.sortPassword = !checkSort.sortPassword;
                checkSort.sortPassword ? sort = { Password: 1 } : sort = { Password: -1 };
                break;
            case "Role":
                checkSort.sortRole = !checkSort.sortRole;
                checkSort.sortRole ? sort = { Role: 1 } : sort = { Role: -1 };
                break;
        }
    }
    let User = await myModel.UserModel.find(condition).sort(sort);
    res.render('User/index', { title: "User", users: User })
}

exports.edit = async (req, res, next) => {
    let msg = '';
    var obj = await myModel.UserModel.findById(req.params.idUser);
    console.log(obj)
    if (req.method == 'POST') {
        let objUser = new myModel.UserModel();
        let dataUser = {
           UserName: req.body.UserName,
           Email: req.body.Email,
           Password: req.body.Password,
           Role: req.body.Role,
        }
        try {
            let new_sp = await myModel.UserModel.updateMany({ _id: req.params.idUser }, { $set: dataUser },);
            console.log(new_sp);
            console.log("Sửa Thành Công" + objUser);
            msg = 'Sửa Thành Công';
           return res.redirect("/user");//Cannot set headers after they are sent to the client
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }
    }
    res.render('User/edit', { msg: msg, details: obj });
}

exports.add = async (req, res, next) => {
    if (req.method === 'POST') {
        let objUser = await myModel.UserModel();
        objUser.UserName = req.body.UserName;
        objUser.Email = req.body.Email;
        objUser.Password = req.body.Password;
        objUser.Role = req.body.Role;
        try {
            let new_user = await objUser.save();
            console.log(new_user);
            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
           return res.redirect("/user");
        } catch (error) {
            console.log(error);
        }
    }
    res.render('User/add')
}
exports.delete = async (req, res, next) => {
    try {
        await myModel.UserModel.deleteMany({ _id: req.params.idUser });
       return res.redirect("/user");//Cannot set headers after they are sent to the client
    } catch (error) {
        console.log("delete:" + error);
    }
    console.log("Delete Thành Công" + req.params.idProduct);
}