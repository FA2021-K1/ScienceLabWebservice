import Apodini
import FluentKit
import Shared

struct GetResidencies: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    
    func handle() throws -> EventLoopFuture<[Residence]> {
        databaseModel.readResidence()
    }
}
