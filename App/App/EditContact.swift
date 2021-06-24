import SwiftUI
import Model
import Combine

struct EditContact: View {
    @Environment(\.presentationMode) private var presentationMode
    
    @ObservedObject private var viewModel: EditContactViewModel
    
    @State private var loadingCancellable: AnyCancellable?
    
    var navigationTitle: String {
        viewModel.id == nil ? "Create New Contact" : "Edit Contact"
    }
    
    init(_ model: Model, id: Contact.ID) {
        viewModel = EditContactViewModel(model, id: id)
    }
    
    var body: some View {
        NavigationView {
            self.form
                .onAppear(perform: viewModel.updateStates)
                .navigationBarTitle(navigationTitle, displayMode: .inline)
                .toolbar {
                    ToolbarItem(placement: .primaryAction) {
                        Button(action: {
                            self.save()
                            self.presentationMode.wrappedValue.dismiss()
                        }) {
                            Text("Save")
                                .bold()
                        }
                    }
                }
        }
    }
    
    private func save() {
        loadingCancellable = viewModel.save().sink { _ in }
    }
    
    private func delete() {
        loadingCancellable = viewModel.delete().sink { _ in }
    }
    
    private var form: some View {
        Form {
            Section(header: Text("Name")) {
                TextField("Name", text: $viewModel.name)
            }
            
            Section(header: Text("Birthday")) {
                DatePicker(
                    "Birthday",
                    selection: $viewModel.birthday,
                    in: ...Date(),
                    displayedComponents: [.date]
                )
            }
            
            if viewModel.id != nil {
                Button(action: {
                    self.delete()
                    self.presentationMode.wrappedValue.dismiss()
                }) {
                    HStack {
                        Spacer()
                        Text("Delete")
                            .foregroundColor(.red)
                            .bold()
                        Spacer()
                    }
                }
            }
        }
    }
}

struct EditContact_Previews: PreviewProvider {
    private static let model: Model = MockModel()
    
    static var previews: some View {
        EditContact(model, id: model.contacts[0].id)
            .environmentObject(model)
    }
}
