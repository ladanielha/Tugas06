const mongoose = require("mongoose");

const CustomerObject = {
  nomor: { type: String, unique: true },
  nama: { type: String },
  alamat: { type: String },
  telepon: { type: String }
}

const CustomerSchema = new mongoose.Schema(CustomerObject)

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  CustomerObject,
}