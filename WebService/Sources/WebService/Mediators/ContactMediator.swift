import Apodini
import Foundation
import Shared

struct ContactMediator: Decodable, Content {
    var name: String?
    var birthday: Date?

    func update(to contact: Contact) {
        name.map {
            contact.name = $0
        }
        birthday.map {
            contact.birthday = $0
        }
    }
}
