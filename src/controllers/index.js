const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  update,
  updateStatusContact,
} = require("../services/contacts.service");

const getAllContacts = async (req, res, next) => {
  const contacts = await getContacts();
  return res.status(200).json({ status: "success", data: contacts });
};

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      message: `Contacts with id ${contactId} is not found`,
    });
  }

  return res.status(200).json({ status: "success", data: contact });
};

const createContact = async (req, res, next) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      status: "error",
      message: "missing required name field",
    });
  }

  const contact = await addContact({ name, phone, email });
  return res.status(201).json({ status: "success", data: contact });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await update(contactId, body);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      message: `Contacts with id ${contactId} is not found`,
    });
  }

  return res.status(200).json({
    status: "success",
    message: `Contacts with id ${contactId} was updated`,
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      message: `Contacts with id ${contactId} id not found`,
    });
  }

  return res.status(200).json({
    status: "success",
    data: contact,
    message: `Contacts with id ${contactId} was deleted`,
  });
};

const changeStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean" && !favorite) {
    return res.status(400).json({
      status: "error",
      message: "missing field favorite",
    });
  }

  const result = await updateStatusContact(contactId, { favorite });

  if (!result) {
    return res.status(404).json({ status: "error", message: "Not found" });
  }

  res.status(200).json({
    status: "success",
    message: `field with id ${contactId} was updated his status!`,
    data: result,
  });
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  changeStatus,
};
