const { Contacts } = require("../models/contactsModel");

const getContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contacts({ name, email, phone });
  await contact.save();

  return contact;
};

const update = async (contactId, { name, email, phone }) => {
  const contact = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contacts.findByIdAndDelete(contactId);
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  update,
};
