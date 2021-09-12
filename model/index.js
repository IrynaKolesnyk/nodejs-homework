const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath));
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const oneContact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...body, id: v4() };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const remaindContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(remaindContacts));
    return remaindContacts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = { ...body, id: contactId };
    const contactsList = await listContacts();

    const idx = contactsList.findIndex(
      ({ id }) => id.toString() === contactId.toString()
    );

    if (idx !== -1) {
      contactsList[idx] = updatedContact;
    }
    const stringContacts = JSON.stringify(contactsList);
    fs.writeFile(contactsPath, stringContacts);
    return contactsList[idx];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const contacts = require("./contacts.json");
