//
//  LocalStorageModel.swift
//  Model
//
//  Created by Paul Schmiedmayer on 3/23/20.
//  Copyright © 2020 TUM LS1. All rights reserved.
//

import Foundation
import Combine
import Shared


// MARK: LocalStorageModel
/// A `Model` that persists its content on the local storage e.g. using the file system, UserDefaults and the KeyChain
public class LocalStorageModel: Model {
    /// The `AnyCancellable`s that is used to keep a reference to the publisher chains that store the `Account`s and `Transaction`s
    var cancellables = Set<AnyCancellable>()
    
    
    /// Creates a `Model` that stores information locally on the filesystem
    public convenience init() {
        self.init(contacts: Contact.loadFromFile(),
                  residencies: Residence.loadFromFile())
        
        // Subscribe to the `Publisher` provided by the `@Published` property wrapper and store the
        // `Account`s and `Transaction`s on disk once we receive a new value
        $contacts
            .sink { $0.saveToFile() }
            .store(in: &cancellables)

        $residencies
            .sink { $0.saveToFile() }
            .store(in: &cancellables)
    }
    
    
    override public func save(_ contact: Contact) -> Future<Void, Error> {
        let newContact = contact
        
        if newContact.id == nil {
            newContact.id = UUID()
        }
        
        return Future.delay(super.save(newContact), by: 0.5)
    }
    
    override public func save(_ residence: Residence) -> Future<Void, Error> {
        let newResidence = residence
        
        if newResidence.id == nil {
            newResidence.id = UUID()
        }
        
        return Future.delay(super.save(newResidence), by: 0.5)
    }
    
    override public func delete(contact id: Contact.IDValue) -> Future<Void, Error> {
        Future.delay(super.delete(contact: id), by: 0.5)
    }
    
    override public func delete(residence id: Residence.IDValue) -> Future<Void, Error> {
        Future.delay(super.delete(residence: id), by: 0.5)
    }
}
