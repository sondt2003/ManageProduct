const myModel = require('../../model/User.model');
let checkSort = [
    sortID = true,
    sortUserName = true,
    sortEmail = true,
    sortPassword = true,
    sortRole = true,
];
exports.getUser = async (req, res, next) => {
    let condition = null;
    let data = { msg: '', status: '' }
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
    res.json({data,User})
}

exports.edit = async (req, res, next) => {
    let data = { msg: '', status: '' }
    var obj = await myModel.UserModel.findById(req.params.idUser);
    console.log(obj)
        let objUser = new myModel.UserModel();
        let dataUser = {
            UserName: req.query.UserName,
            Email: req.query.Email,
            Password: req.query.Password,
            Role: req.query.Role,
        }
        try {
            let new_sp = await myModel.UserModel.updateMany({ _id: req.params.idUser }, { $set: dataUser },);
            console.log(new_sp);
            console.log("Sửa Thành Công" + objUser);
            data.msg = 'Sửa Thành Công';
        } catch (err) {
            console.log(err);
            data.msg = 'Lỗi ' + err.message;
        }
    res.json(data);
}

exports.add = async (req, res, next) => {
    let data = { msg: '', status: '' }
        let objUser = await myModel.UserModel();
        objUser.UserName = req.query.UserName;
        objUser.Email = req.query.Email;
        objUser.Password = req.query.Password;
        objUser.Role = req.query.Role;
        try {
            let new_user = await objUser.save();
            console.log(new_user);
            console.log("Đã ghi thành công");
            data.msg = 'Đã thêm thành công';
        } catch (error) {
            console.log(error);
            data.msg = error;
        }
    res.json(data)
}
exports.delete = async (req, res, next) => {
    let data = { msg: '', status: '' }
    try {
        await myModel.UserModel.deleteMany({ _id: req.params.idUser });
    } catch (error) {
        console.log("delete:" + error);
    }
    console.log("Delete Thành Công" + req.params.idProduct);
    data.msg = "Delete Thành Công"
    res.json(data)
}