// referințe la elementele HTML
const inputName = document.getElementById("input-name");
const inputPhone = document.getElementById("input-phone");
const addContactBtn = document.getElementById("add-contact-btn");
const contactsList = document.getElementById("contacts-list");

let contacts = [];

// adăugarea unui contact
function addContact() {
  const name = inputName.value;
  const phone = inputPhone.value;

  if (name && phone) {
    const existingContact = contacts.find((contact) => contact.name === name);

    if (existingContact) {
      existingContact.phone = phone;
    } else {
      contacts.push({ name, phone });
    }

    inputName.value = "";
    inputPhone.value = "";
    displayContacts();
  }
}

// afisare contactelor în tabel
function displayContacts() {
  //stergem conținutul existent al listei de contacte
  contactsList.innerHTML = "";

  // parcurgem fiecare contact si cream rand pt tabel
  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // valori si atribute pt elementele create
    nameCell.textContent = contact.name;
    phoneCell.textContent = contact.phone;
    editBtn.textContent = "Modifică";
    deleteBtn.textContent = "Șterge";

    editBtn.setAttribute("data-index", index);
    deleteBtn.setAttribute("data-index", index);

    // eveniment de click pt modificare si stergere
    editBtn.addEventListener("click", editContact);
    deleteBtn.addEventListener("click", deleteContact);
    // Adăugarea elementelor create la rândul tabelului
    editCell.appendChild(editBtn);
    deleteCell.appendChild(deleteBtn);

    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    // Add rand la lista de contacte
    contactsList.appendChild(row);
  });
}

// fct pt editarea unui contact
function editContact(event) {
  const index = event.target.getAttribute("data-index");
  const contact = contacts[index];

  // Populați valorile de input cu informațiile contactului existent
  inputName.value = contact.name;
  inputPhone.value = contact.phone;
}

// fct pt stergerea unui contact
function deleteContact(event) {
  const index = event.target.getAttribute("data-index");
  contacts.splice(index, 1);
  displayContacts();
}

// tasta enter pentru adăugarea unui contact
addContactBtn.addEventListener("click", addContact);
inputPhone.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addContact();
  }
});
