import Foundation
import Shared

public class MockModel: LocalStorageModel {
    
    private static func createHomeGermany(_ contact: Contact) -> Residence {
        guard let contactId = contact.id else {
            fatalError("Tried to creeate a Residence with a Contact which's id is nil")
        }
        return Residence(id: UUID(), address: "Boltzmannstraße 3", postalCode: "85748", country: "Germany", contact: contactId)
    }
    
    private static func createHomeFrance(_ contact: Contact) -> Residence {
        guard let contactId = contact.id else {
            fatalError("Tried to creeate a Residence with a Contact which's id is nil")
        }
        return Residence(id: UUID(), address: "Place Charles de Gaulle", postalCode: "75008", country: "France", contact: contactId)
    }
    
    private static func createHomeAustria(_ contact: Contact) -> Residence {
        guard let contactId = contact.id else {
            fatalError("Tried to creeate a Residence with a Contact which's id is nil")
        }
        return Residence(id: UUID(), address: "Getreidegasse 9", postalCode: "5020", country: "Austria", contact: contactId)
    }
    
    public convenience init() {
        let hans = Contact(id: .init(), name: "Hans Santoso", birthday: Date(timeIntervalSince1970: 20000000))
        let paul = Contact(id: .init(), name: "Paul Schmiedmayer", birthday: Date(timeIntervalSince1970: 10000000))
        
        let contacts = [hans, paul].sorted()
        
        let residencies = [
            MockModel.createHomeGermany(hans),
            MockModel.createHomeFrance(hans),
            MockModel.createHomeAustria(paul)
        ]
        self.init(contacts: contacts, residencies: residencies)
    }
}
