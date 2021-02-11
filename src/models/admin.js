const Schema = require("mongoose").Schema;
const UserModel = require("./user");

const adminSchema = new Schema({});

module.exports = UserModel.discriminator("Admin", adminSchema);
