import Apodini
import FluentKit
import Shared


struct CreateContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var contact: Contact
    
    
    func handle() throws -> EventLoopFuture<Contact> {
        databaseModel.createContact(contact)
    }
}
