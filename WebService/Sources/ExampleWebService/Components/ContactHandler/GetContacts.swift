import Apodini
import FluentKit
import Shared


struct GetContacts: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    
    func handle() throws -> EventLoopFuture<[Contact]> {
        databaseModel.readContact()
    }
}
