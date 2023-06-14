const path = require('path')
const fs = require('fs')
let checkSort = [
    sortID = true,
    sortName = true,
    sortContent = true,
    sortPrice = true,
    sortIDtype = true,
    sortImage = true,
];
const myModel = require('../model/Product.model');
exports.getProduct = async (req, res, next) => {
    let condition = null;
    let sort = null;
    if (typeof (req.query.price) != 'undefined') {
        let price = req.query.price;
        condition = { Price: price };
    } else if (typeof (req.query.IDtype) != 'undefined') {
        let type = req.query.IDtype;
        condition = { IDtype: type };
    } else if (typeof (req.query.Name) != 'undefined') {
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
            case "Content":
                checkSort.sortContent = !checkSort.sortContent;
                checkSort.sortContent ? sort = { Content: 1 } : sort = { Content: -1 };
                break;
            case "Price":
                checkSort.sortPrice = !checkSort.sortPrice;
                checkSort.sortPrice ? sort = { Price: 1 } : sort = { Price: -1 };
                break;
            case "IDtype":
                checkSort.sortIDtype = !checkSort.sortIDtype;
                checkSort.sortIDtype ? sort = { IDtype: 1 } : sort = { IDtype: -1 };
                break;
            case "Image":
                checkSort.sortImage = !checkSort.sortImage;
                checkSort.sortImage ? sort = { Image: 1 } : sort = { Image: -1 };
                break;
        }
    }

    var list = await myModel.productModel.find(condition).populate('IDtype').sort(sort);
    var listType = await myModel.typeModel.find().sort({ name: 1 });
    checkDeleteData(list);
    res.render('Product/index', { title: "Product", Products: list, listTypes: listType })
    // res.json("231")
}
exports.add = async (req, res, next) => {
    var list = await myModel.productModel.find().populate('IDtype');
    var listType = await myModel.typeModel.find().sort({ name: 1 });
    let msg = '';
    if (req.method == 'POST') {
        let objProduct = new myModel.productModel();
        objProduct.Name = req.body.Name;
        try { objProduct.Image = req.file.filename; }
        catch (error) {
            objProduct.Image = "";
        }
        objProduct.Content = req.body.Content;
        objProduct.Price = req.body.Price;
        objProduct.IDtype = req.body.Type;
        try {
            let new_sp = await objProduct.save();
            console.log(new_sp);
            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
            return res.redirect("/product");//Cannot set headers after they are sent to the client
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }
    }
    res.render('Product/add', { msg: msg, listTypes: listType });
}
exports.edit = async (req, res, next) => {
    let msg = '';
    var listType = await myModel.typeModel.find().sort({ name: 1 });
    var objProduct = await myModel.productModel.findById(req.params.idProduct);
    if (req.method == 'POST') {
        let objProducts = new myModel.productModel();
        let Image_product = "";
        try { Image_product = req.file.filename; }
        catch (error) {
            Image_product = "";
        }
        let dataProduct = {
            Name: req.body.Name,
            Image: Image_product,
            Content: req.body.Content,
            Price: req.body.Price,
            IDtype: req.body.Type,
        }
        try {
            let new_sp = await myModel.productModel.updateMany({ _id: req.params.idProduct }, { $set: dataProduct },);
            console.log(new_sp);
            console.log("Sửa Thành Công" + objProducts);
            msg = 'Sửa Thành Công';
            return res.redirect("/product");//Cannot set headers after they are sent to the client
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }
    }
    res.render('Product/edit', { msg: msg, details: objProduct, listTypes: listType });
}
exports.details = async (req, res, next) => {
    var objProduct = await myModel.productModel.findById(req.params.idProduct).populate('IDtype');
    console.log(objProduct)
    res.render('Product/details', { details: objProduct });
}
exports.delete = async (req, res, next) => {
    try {
        await myModel.productModel.deleteMany({ _id: req.params.idProduct });
        return res.redirect("/product");//Cannot set headers after they are sent to the client
    } catch (error) {
        console.log("delete:" + error);
    }
}
const checkDeleteData=list=>{
    const process_path = path.join(process.cwd(), '/public/data')
            fs.readdir(process_path, function (err, files) {
                const list_product = files.filter(el => path.extname(el) === ".png");
                for (let i = 0; i < list_product.length; i++) {
                    let exists = false;
                    for (let j = 0; j < list.length; j++) {
                        if (list_product[i] == list[j].Image) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        fs.unlink(process_path + "\\" + list_product[i], (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log("Delete File successfully.");
                        });
                        console.log(list_product[i]);
                    }
                }
            })
}