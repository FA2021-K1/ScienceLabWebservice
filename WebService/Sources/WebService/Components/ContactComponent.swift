import Apodini
import Shared

struct ContactComponent: Component {
    @PathParameter
    var contactId: Contact.IDValue

    var content: some Component {
        Group("contacts") {
            CreateContact()
                .operation(.create)

            GetContacts()

            Group($contactId) {
                GetContact(contactId: $contactId)

                UpdateContact(contactId: $contactId)
                    .operation(.update)

                DeleteContact(contactId: $contactId)
                    .operation(.delete)
            }
        }
    }
}
