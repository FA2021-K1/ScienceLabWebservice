import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + Contact
extension DatabaseModel {
    func createContact(_ contact: Contact) -> EventLoopFuture<Contact> {
        contact
            .save(on: database)
            .map { contact }
    }

    func readContact(_ contactID: Contact.IDValue) -> EventLoopFuture<Contact?> {
        Contact
            .find(contactID, on: database)
    }

    func readContact() -> EventLoopFuture<[Contact]> {
        Contact
            .query(on: database)
            .with(\.$residencies)
            .sort(\.$name, .ascending)
            .all()
    }

    func updateContact(_ contactID: Contact.IDValue, with mediator: ContactMediator) -> EventLoopFuture<Contact> {
        Contact
            .find(contactID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { contact in
                mediator.update(to: contact)
                return contact
                    .update(on: self.database)
                    .transform(to: contact)
            }
    }

    func deleteContact(_ contactID: Contact.IDValue) -> EventLoopFuture<Void> {
        Contact
            .find(contactID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { contact in
                contact
                    .delete(on: self.database)
            }
    }
}
