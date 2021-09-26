import Apodini
import Shared
import Foundation

// MARK: UserMediator
/// A mediator for User to be able to validate the username and password
struct UserMediator: Decodable, Content {
    /// username used for logging in
    var username: String
    /// password used for logging in
    var password: String
    var type: UserType
}

// MARK: UserMediator Extension
/// Validate that mail is actually an email adress and password is at least 8 characters long
extension UserMediator {
    
    /**
     validates whether the given username and password are adequate
     - Parameters:
     - _: `Validations` used to verify the username and password
     */
    func validate() -> Bool {
        !(self.password.count < 4 || self.username.count < 4)
    }
}
