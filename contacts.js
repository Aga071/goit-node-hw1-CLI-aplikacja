import * as fs from "node:fs/promises";
import path from "path";

import { nanoid } from "nanoid";

import "colors";

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts);
  } catch (err) {
    console.log("List not loaded", err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts).find((contact) => contact.id === contactId);
  } catch (err) {
    console.log("Contact not found", err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const newContactsList = JSON.parse(readContacts).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return JSON.parse(readContacts).find((contact) => contact.id === contactId);
  } catch (err) {
    console.log("Contact not deleted".red, err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const jsonContacts = JSON.parse(readContacts);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [...jsonContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (err) {
    console.log("Contact not added".red, err.message);
  }
};

export { listContacts, getContactById, removeContact, addContact };
