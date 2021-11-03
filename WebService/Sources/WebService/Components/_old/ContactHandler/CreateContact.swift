import Apodini
import ApodiniObserve
import FluentKit
import Logging
import Metrics
import Shared

struct CreateContact: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @ApodiniLogger
    var logger
    
    @ApodiniCounter(label: "counter")
    var counter

    @Parameter(.http(.body))
    var contact: Contact

    func handle() throws -> EventLoopFuture<Contact> {
        logger.info("Created Contact!")
        counter.increment()
        
        return databaseModel.createContact(contact)
    }
}
