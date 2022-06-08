const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFile = async (data, path = contactsPath) => {
  await fs.writeFile(path, JSON.stringify(data), "utf8");
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => String(id) === String(contactId));

  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find(({ id }) => id === String(contactId));

  if (!deletedContact) {
    return null;
  }

  const updatedContacts = contacts.filter(({ id }) => id !== String(contactId));
  writeFile(updatedContacts);

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: String(uuid()), name, email, phone };
  writeFile(contacts.concat(newContact));

  return newContact;
};

const update = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === String(contactId));

  if (!contact) {
    return null;
  }

  const updatedContact = { ...contact, ...body };
  const filteredContacts = contacts.filter(
    ({ id }) => id !== String(contactId)
  );

  writeFile([...filteredContacts, updatedContact]);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  update,
};
