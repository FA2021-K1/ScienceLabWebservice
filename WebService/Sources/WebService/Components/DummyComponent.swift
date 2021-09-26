import Apodini
import Shared

struct DummyComponent: Component {
    var content: some Component {
        Group("dummy") {
            DummyHandler()
                .operation(.create)
        }
    }
}
