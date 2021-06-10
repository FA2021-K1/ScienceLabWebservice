import SwiftUI
import Model

struct ContactCell: View {
    @EnvironmentObject private var model: Model
    
    var id: Contact.IDValue
    
    var body: some View {
        model.contact(id).map { contact in
            ZStack(alignment: .top) {
                RoundedRectangle(cornerRadius: 20)
                    .foregroundColor(Color("Cell"))
                    .shadow(radius: 5)
                VStack(spacing: 10) {
                    Image(systemName: "person.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.orange)
                    Text(contact.name)
                        .bold()
                        .multilineTextAlignment(.center)
                        .font(.system(.title3, design: .rounded))
                        
                }.padding()
            }
        }
    }
}

struct ContactCell_Previews: PreviewProvider {
    private static let model: Model = MockModel()
    
    private static var contactsID: UUID {
        guard let contactsID = model.contacts[0].id else {
            fatalError("Clould not load a contact with an id from the MockModel")
        }
        return contactsID
    }
    
    static var previews: some View {
        ForEach(ColorScheme.allCases, id: \.hashValue) { colorScheme in
            ContactCell(id: contactsID)
                .colorScheme(colorScheme)
        }.environmentObject(model)
        .previewLayout(.sizeThatFits)
    }
}
