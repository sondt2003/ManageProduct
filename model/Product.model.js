var db=require('./db');
const typeProduct=new db.mongoose.Schema(
    {
        Name:{type:String,require:true},
    },
    {
        collection:'type',
        versionKey:false
    }
)
const productSchema=new db.mongoose.Schema(
    {
        Name:{type:String,require:true},
        Image:{type:String,require:true},
        Content:{type:String,require:true},
        Price:{type:Number,require:true},
        IDtype:{type:db.mongoose.Types.ObjectId,ref:'typeModel'},
    },
    {
        collection:'Product',
        versionKey:false
    }
)
let typeModel=db.mongoose.model('typeModel',typeProduct);
let productModel=db.mongoose.model('productModel',productSchema);
module.exports={typeModel,productModel};