var db = require("./db");
const UserSchema =new db.mongoose.Schema(
    {
        UserName: { type: String, require: true },
        Email: { type: String, require: true },
        Password: { type: String, require: true },
        Role: { type: String, require: true },
    },
    {
        collection: "User",
        versionKey:false
    },
)
let UserModel = db.mongoose.model("UserModel", UserSchema);
module.exports = { UserModel };