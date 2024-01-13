import { program } from "commander";
import "colors";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactslist = await listContacts();
      console.table(contactslist);
      break;

    case "get":
      const contactGet = await getContactById(id);
      console.table(contactGet);
      break;

    case "add":
      const contactAdd = await addContact(name, email, phone);
      console.table(contactAdd);
      break;

    case "remove":
      const contactRemove = await removeContact(id);
      console.table(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
