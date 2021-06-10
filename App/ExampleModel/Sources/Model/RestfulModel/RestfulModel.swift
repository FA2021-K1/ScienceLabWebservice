import Foundation
import Combine
import Shared


public class RestfulModel: LocalStorageModel {
    
    static var baseURL: URL = {
        guard let baseURL = URL(string: "http://localhost:8080/v1/") else {
            fatalError("Could not create the base URL for the Web Service")
        }
        return baseURL
    }()
    
    public convenience init() {
        self.init(contacts: Contact.loadFromFile(),
                  residencies: Residence.loadFromFile())
        
        $contacts
            .sink {
                $0.saveToFile()
            }
            .store(in: &cancellables)

        $residencies
            .sink {
                $0.saveToFile()
            }
            .store(in: &cancellables)
        
        self.refresh()
    }
    
    func delete<E: Restful>(_ id: E.ID, in keyPath: ReferenceWritableKeyPath<RestfulModel, [E]>) -> Future<Void, Error> {
        Future<Void, Error> { promise in
            E.delete(id: id)
                .mapError { _ in
                    self.setServerError(to: .deleteFailed(E.self))
                }
                .sink(receiveCompletion: Future.map(to: promise)) {
                    self[keyPath: keyPath].removeAll(where: { $0.id == id })
                }
                .store(in: &NetworkManager.cancellables)
        }
    }
    
    func saveElement<T: Restful>(_ element: T, to collection: ReferenceWritableKeyPath<RestfulModel, [T]>) -> Future<Void, Error> {
        Future<Void, Error> { promise in
            let networkPublisher: AnyPublisher<T, Error>
            if self[keyPath: collection].contains(where: { $0.id == element.id }) {
                networkPublisher = element.put()
            } else {
                networkPublisher = element.post()
            }
            
            networkPublisher
                .mapError { _ in
                    self.setServerError(to: .saveFailed(T.self))
                }
                .sink(receiveCompletion: Future.map(to: promise)) { newElement in
                    self[keyPath: collection].replaceAndSort(newElement)
                }
                .store(in: &NetworkManager.cancellables)
        }
    }
    
    
    override public func save(_ contact: Contact) -> Future<Void, Error> {
        saveElement(contact, to: \.contacts)
    }
    
    override public func save(_ residence: Residence) -> Future<Void, Error> {
        saveElement(residence, to: \.residencies)
    }
    
    override public func delete(contact id: Contact.IDValue) -> Future<Void, Error> {
        Future { [self] promise in
            delete(id, in: \.contacts)
                .sink { _ in
                    refresh()
                    promise(.success(Void()))
                }
                .store(in: &cancellables)
        }
    }
    
    override public func delete(residence id: Residence.IDValue) -> Future<Void, Error> {
        delete(id, in: \.residencies)
    }
    
    func setServerError(to error: ServiceError) -> ServiceError {
        self.serverError = error
        return error
    }
    
    private func refresh() {
        Contact.get()
            .sink(receiveCompletion: { completion in
                    if case .failure = completion {
                        self.serverError = .loadingFailed(Contact.self)
                    }
                },
                receiveValue: { contacts in
                    self.contacts = contacts
                })
            .store(in: &cancellables)
        
        Residence.get()
            .sink(receiveCompletion: { completion in
                    if case .failure = completion {
                        self.serverError = .loadingFailed(Residence.self)
                    }
                },
                receiveValue: { residencies in
                    self.residencies = residencies
                })
            .store(in: &cancellables)
    }
}
