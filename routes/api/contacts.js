const express = require("express");
const router = express.Router();
const {
  validateCreate,
  validateUpdate,
} = require("../../middleware/validation");

const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers");

router.get("/", getAllContacts);
router.get("/:contactId", getOneContact);
router.post("/", validateCreate, createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateUpdate, updateContact);

module.exports = router;
