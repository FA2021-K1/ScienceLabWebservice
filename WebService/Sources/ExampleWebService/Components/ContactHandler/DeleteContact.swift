import Apodini
import FluentKit
import Shared


struct DeleteContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Binding
    var contactId: Contact.IDValue
    
    @Throws(.notFound, reason: "The specified contact could not be found")
    var notFound: ApodiniError
    
    
    func handle() throws -> EventLoopFuture<Status> {
        databaseModel
            .deleteContact(contactId)
            .flatMapErrorThrowing { error in
                throw notFound
            }
            .transform(to: .ok)
    }
}
