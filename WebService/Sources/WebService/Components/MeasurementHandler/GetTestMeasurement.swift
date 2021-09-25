import Apodini
import FluentKit
import Shared

struct GetTestMeasurement: Handler {
    @Parameter(.http(.body))
    var message: String
    
    func handle() async throws -> String {
        print(message)
        return "Lab received data"
    }
}
