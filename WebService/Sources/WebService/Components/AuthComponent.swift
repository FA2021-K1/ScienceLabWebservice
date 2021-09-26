import Apodini
import Shared

struct AuthComponent: Component {
    var content: some Component {
        Group("auth") {
            RegistrationHandler()
                .operation(.create)
            
            Group("login") {
                LoginHandler()
                    .operation(.create)
            }
        }
    }
}
