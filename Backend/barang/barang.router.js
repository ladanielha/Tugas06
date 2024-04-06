const express = require("express");
const { BarangList, BarangCreate, BarangDetail, BarangUpdate, BarangDelete } = require("./barang.controller");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { BarangNomorValidator, BarangNamaValidator, BarangSatuanValidator, BarangHargaJualValidator, BarangStokValidator } = require("./barang.validation");

const BarangRouter = express.Router();

BarangRouter.get('/', [IsAuthenticated], BarangList);
BarangRouter.post('/', [
  IsAuthenticated,
  Validate([
    BarangNomorValidator(false, true, false),
    BarangNamaValidator(false),
    BarangSatuanValidator(false),
    BarangHargaJualValidator(false),
    BarangStokValidator(false)
  ])
], BarangCreate);
BarangRouter.get('/:id', [IsAuthenticated], BarangDetail);
BarangRouter.put('/:id', [
  IsAuthenticated,
  Validate([
    BarangNomorValidator(true, false, false),
    BarangNamaValidator(true),
    BarangSatuanValidator(true),
    BarangHargaJualValidator(true),
    BarangStokValidator(true)
  ])
], BarangUpdate);
BarangRouter.delete('/:id', [IsAuthenticated], BarangDelete);

module.exports = {
  BarangRouter
}