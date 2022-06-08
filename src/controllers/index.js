const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  update,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({ status: "success", code: 200, data: contacts });
  } catch (err) {
    next(err);
  }
};

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.json({
        status: "error",
        code: 404,
        message: `Contacts with id ${contactId} id not found`,
      });
    }

    return res.json({ status: "success", code: 200, data: contact });
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.json({
        status: "success",
        code: 400,
        message: "missing required name field",
      });
    }

    const contact = await addContact(req.body);
    return res.json({ status: "success", code: 201, data: contact });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await removeContact(contactId);

    if (!contact) {
      return res.json({
        status: "success",
        code: 404,
        message: `Contacts with id ${contactId} id not found`,
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: contact,
      message: `Contacts with id ${contactId} was deleted`,
    });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  console.log(body);

  try {
    const contact = await update(contactId, body);

    if (!contact) {
      return res.json({
        status: "success",
        code: 404,
        message: `Contacts with id ${contactId} id not found`,
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: contact,
      message: `Contacts with id ${contactId} was updated`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
};
