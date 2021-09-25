import Apodini
import Shared

struct MeasurementComponent: Component {
    var content: some Component {
        Group("auth") {
            LoginHandler()
                .operation(.create)
        }
    }
}
