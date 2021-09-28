import Apodini
import FluentKit
import Shared

struct DeleteAllMeasurements: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    func handle() async throws -> Status {
        do {
            try await databaseModel.deleteMeasurements()
            return .ok
        } catch {
            throw error
        }
    }
}
