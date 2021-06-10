import SwiftUI
import Combine
import Model

struct EditResidence: View {
    
    @Environment(\.presentationMode) private var presentationMode
    
    @ObservedObject private var viewModel: EditResidenceViewModel
    
    @State private var loadingCancellable: AnyCancellable?
    
    var navigationTitle: String {
        viewModel.id == nil ? "Create New Residence" : "Residence"
    }
    
    init(_ model: Model, contact: Contact, id: Residence.ID) {
        viewModel = EditResidenceViewModel(model, contact: contact, id: id)
    }
    
    var body: some View {
        NavigationView {
            self.form
                .onAppear(perform: viewModel.updateStates)
                .navigationBarTitle(navigationTitle, displayMode: .inline)
                .toolbar {
                    ToolbarItem(placement: .primaryAction) {
                        if viewModel.id == nil {
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
    }
    
    private var form: some View {
        Form {
            Section(header: Text("Address")) {
                TextField("Address", text: $viewModel.address)
            }
            
            Section(header: Text("Postal code")) {
                TextField("Postal code", text: $viewModel.postalCode)
            }
            
            Section(header: Text("Country")) {
                TextField("Country", text: $viewModel.country)
            }
        }
    }
    
    private func save() {
        loadingCancellable = viewModel.save().sink {_ in }
    }
}

struct EditResidence_Previews: PreviewProvider {
    private static let model: Model = MockModel()
    
    static var previews: some View {
        EditResidence(model, contact: model.contacts[0], id: model.residencies[0].id)
            .environmentObject(model)
    }
}
