const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { OrderCreate, OrderDetail, OrderList } = require("./order.controller");
const { OrderNomorValidator, OrderTanggalValidator, OrderCustomerValidator, OrderItemsValidator, OrderItemsQtyValidator, OrderItemsSubtotalValidator } = require("./order.validation");
const { CustomerNomorValidator, CustomerNamaValidator, CustomerAlamatValidator, CustomerTeleponValidator, CustomerIDValidator } = require("../customer/customer.validation");
const { BarangNomorValidator, BarangNamaValidator, BarangSatuanValidator, BarangHargaJualValidator, BarangStokValidator, BarangIDValidator } = require("../barang/barang.validation");

const OrderRouter = express.Router();

OrderRouter.get('/', [
  IsAuthenticated,
], OrderList)
OrderRouter.post('/', [
  IsAuthenticated,
  Validate([
    OrderNomorValidator(),
    OrderTanggalValidator(),
    OrderCustomerValidator(),
    CustomerNomorValidator(true, "customer.nomor"),
    CustomerIDValidator("customer._id"),
    CustomerNamaValidator("customer.nama"),
    CustomerAlamatValidator("customer.alamat"),
    CustomerTeleponValidator("customer.telepon"),
    OrderItemsValidator(),
    OrderItemsQtyValidator(),
    OrderItemsSubtotalValidator(),
    BarangNomorValidator(true, "items.*.nomor"),
    BarangIDValidator("items.*._id"),
    BarangNamaValidator("items.*.nama"),
    BarangSatuanValidator("items.*.satuan"),
    BarangHargaJualValidator("items.*.hargaJual"),
    BarangStokValidator("items.*.stok")
  ])
], OrderCreate)
OrderRouter.get('/:id', [IsAuthenticated], OrderDetail)

module.exports = {
  OrderRouter
}