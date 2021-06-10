import SwiftUI
import Model

struct ContentView: View {
    @EnvironmentObject private var model: Model
    
    @State private var presentAddContact = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 140), spacing: 10)]) {
                    ForEach(model.contacts) { contact in
                        if let contactId = contact.id {
                            NavigationLink(destination: ContactDetailsView(id: contactId)) {
                                ContactCell(id: contactId).padding()
                            }
                        }
                    }
                }
            }
            .navigationBarTitle("Your Contacts")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(action: { self.presentAddContact.toggle() }) {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $presentAddContact) {
                EditContact(self.model, id: nil)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    private static let model: Model = MockModel()
    
    static var previews: some View {
        ForEach(ColorScheme.allCases, id: \.self) { colorScheme in
                ContentView().colorScheme(colorScheme)
        }.environmentObject(model)
    }
}
