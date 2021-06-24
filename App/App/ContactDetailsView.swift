import SwiftUI
import Model
import Combine

struct ContactDetailsView: View {
    @EnvironmentObject private var model: Model
    
    var id: Contact.IDValue
    
    @State private var editContact = false
    
    @State private var addResidence = false
    
    @State private var deleteResidence = false
    
    @State private var selectedResidence: Residence.IDValue?
    
    @State private var loadingCancellable: AnyCancellable?
    
    private var residencies: [Residence] {
        model.residencies.filter { $0.$contact.id == id }
    }
    
    var body: some View {
        model.contact(id).map { contact in
            ScrollView {
                LazyVStack(alignment: .center/*@END_MENU_TOKEN@*/, spacing: 16) {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 80))
                    Text(contact.name)
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                    HStack {
                        Image(systemName: "calendar.circle.fill")
                            .renderingMode(.original)
                            .font(.system(size: 30))
                        Text(DateFormatter.titleDate.string(from: contact.birthday))
                    }
                    HStack {
                        Text("Residencies")
                            .font(.title2)
                            .bold()
                            .padding(.vertical, 20)
                            .padding(.horizontal)
                        Spacer()
                        Button(action: {
                            addResidence.toggle()
                        }) {
                            Image(systemName: "plus.circle.fill")
                                .foregroundColor(.blue)
                                .font(.system(size: 25))
                        }.padding()
                    }
                    ForEach(residencies) { residence in
                        if let residenceId = residence.id {
                            ResidenceCell(id: residenceId)
                                .padding(.horizontal)
                                .onTapGesture {
                                    self.selectedResidence = residence.id
                                    self.deleteResidence.toggle()
                                }
                        }
                    }
                    .actionSheet(isPresented: $deleteResidence) {
                        ActionSheet(title: Text("Delete Residence"), message: Text("Do you want to delete this residence?"), buttons: [
                            .destructive(Text("Delete")) { self.deleteSelectedResidence() },
                            .cancel()
                        ])
                    }
                    .sheet(isPresented: $editContact) {
                        EditContact(model, id: contact.id)
                    }
                }
                .toolbar {
                    Button(action: {
                        self.editContact.toggle()
                    }) {
                        Text("Edit")
                    }
                }
                .sheet(isPresented: $addResidence) {
                    EditResidence(model, contact: contact, id: nil)
                }
            }
        }
    }
    
    private func deleteSelectedResidence() {
        if let selectedResidenceId = selectedResidence {
            loadingCancellable = model.delete(residence: selectedResidenceId)
                .eraseToAnyPublisher()
                .sink { _ in }
        }
    }
}

struct ContactDetailsView_Previews: PreviewProvider {
    private static let model: Model = MockModel()
    
    private static var contactsID: UUID {
        guard let contactsID = model.contacts[0].id else {
            fatalError("Clould not load a contact with an id from the MockModel")
        }
        return contactsID
    }
    
    static var previews: some View {
        ForEach(ColorScheme.allCases, id: \.self) { colorScheme in
            NavigationView {
                ContactDetailsView(id: contactsID)
            }.colorScheme(colorScheme)
        }.environmentObject(model)
    }
}
