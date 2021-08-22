import Apodini
import ApodiniObserve
import FluentKit
import Shared

struct CreateContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @ApodiniLogger
    var logger

    @Parameter(.http(.body))
    var contact: Contact

    func handle() throws -> EventLoopFuture<Contact> {
        logger.info("Created Contact!")
        return databaseModel.createContact(contact)
    }
}
