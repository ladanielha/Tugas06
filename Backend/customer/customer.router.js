const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { CustomerCreate, CustomerList, CustomerDetail, CustomerUpdate } = require("./customer.controller");
const { CustomerNomorValidator, CustomerNamaValidator, CustomerTeleponValidator, CustomerAlamatValidator } = require("./customer.validation");

const CustomerRouter = express.Router();

CustomerRouter.get("/", [IsAuthenticated], CustomerList)
CustomerRouter.post('/', [
  IsAuthenticated,
  Validate([
    CustomerNomorValidator(false, true, false),
    CustomerNamaValidator(false),
    CustomerTeleponValidator(false),
    CustomerAlamatValidator(false)
  ])
], CustomerCreate)
CustomerRouter.get("/:id", [IsAuthenticated], CustomerDetail)
CustomerRouter.put("/:id", [
  IsAuthenticated,
  Validate([
    CustomerNomorValidator(true, false, false),
    CustomerNamaValidator(true),
    CustomerTeleponValidator(true),
    CustomerAlamatValidator(true)
  ])
], CustomerUpdate)


module.exports = {
  CustomerRouter
}