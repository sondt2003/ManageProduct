const myModel = require('../../model/Product.model');
let checkSort = [
    sortID = true,
    sortName = true,
];

exports.getCategory = async (req, res, next) => {
    let condition = null;
    let data = { msg: '', status: '' }
    let sort = null;
    if (typeof (req.query.Name) != 'undefined') {
        let Name = req.query.Name;
        condition = { Name: Name };
    }
    if (typeof (req.query.sort) != 'undefined') {
        switch (req.query.sort) {
            case "_id":
                checkSort.sortID = !checkSort.sortID;
                checkSort.sortID ? sort = { _id: 1 } : sort = { _id: -1 };
                break;
            case "Name":
                checkSort.sortName = !checkSort.sortName;
                checkSort.sortName ? sort = { Name: 1 } : sort = { Name: -1 };
                break;
        }
    }
    let Category = await myModel.typeModel.find(condition).sort(sort);
    res.json(Category)
}



exports.add = async (req, res, next) => {
    let data = { msg: '', status: '' }
        let objCategory = await myModel.typeModel();
        objCategory.Name = req.query.NameCategory;
        console.log("Name:" + req.query.NameCategory)
        try {
            let new_user = await objCategory.save();
            console.log(new_user);
            console.log("Đã ghi thành công");
            data.msg = 'Đã thêm thành công';
        } catch (error) {
            console.log(error);
        }
    res.json(data);
}
exports.delete = async (req, res, next) => {
    try {
        await myModel.typeModel.deleteMany({ _id: req.params.idCategory });
        await myModel.productModel.deleteMany({ IDtype: req.params.idCategory });
    } catch (error) {
        console.log("delete:" + error);
    }
    res.json({msg:"Delele Thanh Cong"})
}


exports.edit = async (req, res, next) => {
    let data = { msg: '', status: '' }
    var obj = await myModel.typeModel.findById();
    if (req.method == 'POST') {
        let objCategory = new myModel.typeModel();
        let dataCategory = {
            Name: req.query.NameCategoryEdit,
        }
        console.log(req.params.idCategory+":Category:"+req.query.NameCategoryEdit);
        try {
            let new_sp = await myModel.typeModel.updateMany({ _id: req.params.idCategory}, { $set: dataCategory },);
            console.log(new_sp);
            console.log("Sửa Thành Công" + objCategory);
            data.msg = 'Sửa Thành Công';
        } catch (err) {
            console.log(err);
            data.msg = 'Lỗi ' + err.message;
        }
    }
    res.json(data)
}