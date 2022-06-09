const express = require("express");
const router = express.Router();
const {
  validateCreate,
  validateUpdate,
  validateFavorite,
} = require("../../middleware/validation");
const { asyncWrapper } = require("../../apiHelpers/");

const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  changeStatus,
} = require("../../controllers");

router.get("/", asyncWrapper(getAllContacts));
router.get("/:contactId", asyncWrapper(getOneContact));
router.post("/", validateCreate, asyncWrapper(createContact));
router.delete("/:contactId", asyncWrapper(deleteContact));
router.put("/:contactId", validateUpdate, asyncWrapper(updateContact));
router.patch(
  "/:contactId/favorite",
  validateFavorite,
  asyncWrapper(changeStatus)
);

module.exports = router;
