const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex === -1) {
        return `Contact with id ${contactId} does not exist or has already been removed.`;
    }

    const removedContact = contacts.splice(contactIndex, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return `Contact with id ${contactId} has been removed.`;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
