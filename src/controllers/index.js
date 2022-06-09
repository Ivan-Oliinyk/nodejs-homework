const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  update,
  updateStatusContact,
} = require("../services/contacts.service");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getContacts();
    return res.status(200).json({ status: "success", data: contacts });
  } catch (err) {
    next(err);
  }
};

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: `Contacts with id ${contactId} id not found`,
      });
    }

    return res.status(200).json({ status: "success", data: contact });
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        status: "error",
        message: "missing required name field",
      });
    }

    const contact = await addContact({ name, phone, email });
    return res.status(201).json({ status: "success", data: contact });
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
      return res.status(404).json({
        status: "error",
        message: `Contacts with id ${contactId} id not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Contacts with id ${contactId} was updated`,
    });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
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
  } catch (err) {
    next(err);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
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
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  changeStatus,
};
