$(document).ready(function () {
    let contacts = [
        { id: 1, firstName: 'Fatihiath', lastName: 'ADEGNIKA', phone: '+221 77 689 98 74', photo: 'https://via.placeholder.com/50' },
        { id: 2, firstName: 'Dolores', lastName: 'DJOSSOU', phone: '+221 78 123 11 09', photo: 'https://via.placeholder.com/50' },
        { id: 3, firstName: 'Yves-Marie', lastName: 'MAKOnG', phone: '+221 76 459 45 87', photo: 'https://via.placeholder.com/50' },
        { id: 4, firstName: 'Fiacre', lastName: 'COULIBALY', phone: '+221 77 765 11 09', photo: 'https://via.placeholder.com/50' }
    ];
    let currentContactId = null;

    function displayContacts() {
        let $contactList = $('#contactList');
        $contactList.empty();
        contacts.forEach(contact => {
            $contactList.append(
                `<li>
                    <a href="#contactDetails" class="contact-item" data-id="${contact.id}">
                        <img src="${contact.photo}" class="contact-photo">
                        <h2>${contact.firstName} ${contact.lastName}</h2>
                        <p>${contact.phone}</p>
                    </a>
                </li>`
            );
        });
        $contactList.listview('refresh');
    }

    // Afficher la liste des contacts au chargement de la page
    displayContacts();

    // Afficher les détails du contact sélectionné
    $(document).on('click', '.contact-item', function () {
        currentContactId = $(this).data('id');
        let contact = contacts.find(c => c.id === currentContactId);
        $('#contactFirstName').val(contact.firstName);
        $('#contactLastName').val(contact.lastName);
        $('#contactPhone').val(contact.phone);
    });

    // Supprimer un contact
    $('#deleteContact').click(function () {
        contacts = contacts.filter(contact => contact.id !== currentContactId);
        $.mobile.changePage('#home');
        displayContacts();
    });

    // Ajouter un nouveau contact
    $('#addContactForm').submit(function (event) {
        event.preventDefault();
        let newContact = {
            id: new Date().getTime(),
            firstName: $('#newContactFirstName').val(),
            lastName: $('#newContactLastName').val(),
            phone: $('#newContactPhone').val(),
            photo: 'https://via.placeholder.com/50'
        };
        contacts.push(newContact);
        $.mobile.changePage('#home');
        displayContacts();
    });

    // Afficher les informations du contact à modifier
    $(document).on('click', 'a[href="#editContact"]', function () {
        let contact = contacts.find(c => c.id === currentContactId);
        $('#editContactFirstName').val(contact.firstName);
        $('#editContactLastName').val(contact.lastName);
        $('#editContactPhone').val(contact.phone);
    });

    // Modifier un contact existant
    $('#editContactForm').submit(function (event) {
        event.preventDefault();
        let contact = contacts.find(c => c.id === currentContactId);
        contact.firstName = $('#editContactFirstName').val();
        contact.lastName = $('#editContactLastName').val();
        contact.phone = $('#editContactPhone').val();
        $.mobile.changePage('#home');
        displayContacts();
    });
});

