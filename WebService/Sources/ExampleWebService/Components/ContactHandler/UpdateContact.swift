import Apodini
import FluentKit
import Shared


struct UpdateContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Binding
    var contactId: Contact.IDValue
    
    @Parameter(.http(.body))
    var mediator: ContactMediator
    
    @Throws(.notFound, reason: "The contact could not be found")
    var notFound: ApodiniError
    
    
    func handle() throws -> EventLoopFuture<Contact> {
        databaseModel
            .updateContact(contactId, with: mediator)
            .flatMapErrorThrowing { error in
                throw notFound
            }
    }
}
