const express = require("express");
const router = express.Router();
const {
  validateCreate,
  validateUpdate,
  validateFavorite,
} = require("../../middleware/validation");

const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  changeStatus,
} = require("../../controllers");

router.get("/", getAllContacts);
router.get("/:contactId", getOneContact);
router.post("/", validateCreate, createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateUpdate, updateContact);
router.patch("/:contactId/favorite", validateFavorite, changeStatus);

module.exports = router;
