exports.yeu_cau_dang_nhap = (req, res, next)=>{
    console.log(req.session.User)
    if(req.session.User){
        next(); 
    }else{
        return res.redirect('Login');
    }
    console.log(req.session.User)
}
exports.khong_yc_dang_nhap = (req, res, next)=>{
    if(!req.session.User){
        next(); 
    }else {
        return res.redirect('user');
    }
}