//
//  Model.swift
//  SampleApp
//
//  Created by Hans Santoso on 04.05.21.
//

import Foundation
import Combine
import Shared


public class Model: ObservableObject {
    @Published public internal(set) var contacts: [Contact]
    
    @Published public internal(set) var residencies: [Residence]
    
    @Published public internal(set) var serverError: ServiceError?
    
    init(contacts: [Contact] = [], residencies: [Residence] = []) {
        self.contacts = contacts
        self.residencies = residencies
    }
    
    public func contact(_ id: Contact.IDValue) -> Contact? {
        contacts.first(where: { $0.id == id })
    }
    
    public func residence(_ id: Residence.IDValue) -> Residence? {
        residencies.first(where: { $0.id == id })
    }
    
    @discardableResult
    public func save(_ contact: Contact) -> Future<Void, Error> {
        contacts.replaceAndSort(contact)
        return Future()
    }

    @discardableResult
    public func save(_ residence: Residence) -> Future<Void, Error> {
        residencies.replaceAndSort(residence)
        return Future()
    }

    @discardableResult
    public func delete(contact id: Contact.IDValue) -> Future<Void, Error> {
        contacts.removeAll(where: { $0.id == id })
        return Future()
    }
    
    @discardableResult
    public func delete(residence id: Residence.IDValue) -> Future<Void, Error> {
        residencies.removeAll(where: { $0.id == id })
        return Future()
    }
    
    public func resolveServerError() {
        serverError = nil
    }
}
