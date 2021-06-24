import Apodini
import Shared

struct ResidenceMediator: Decodable, Content {
    var address: String?
    var postalCode: String?
    var country: String?

    func update(to residence: Residence) {
        address.map {
            residence.address = $0
        }
        postalCode.map {
            residence.postalCode = $0
        }
        country.map {
            residence.country = $0
        }
    }
}
