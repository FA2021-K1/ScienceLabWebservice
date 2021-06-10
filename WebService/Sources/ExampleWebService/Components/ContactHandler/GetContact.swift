import Apodini
import FluentKit
import Shared


struct GetContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Binding
    var contactId: Contact.IDValue
    
    @Throws(.notFound, reason: "The contact could not be found")
    var notFound: ApodiniError
    
    
    func handle() throws -> EventLoopFuture<Contact> {
        databaseModel
            .readContact(contactId)
            .unwrap(orError: notFound)
    }
}
