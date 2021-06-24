//
//  DatabaseModel.swift
//  
//
//  Created by Paul Schmiedmayer on 6/6/21.
//

import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel
final class DatabaseModel {
    enum DatabaseError: Error {
        case notFound
    }

    let database: Database

    init(_ database: Database) {
        self.database = database
    }
}

extension Application {
    var databaseModel: DatabaseModel {
        guard let databaseModel = self.storage[DatabaseModelStorageKey.self] else {
            DatabaseModelConfiguration()
                .configure(self)
            return self.databaseModel
        }

        return databaseModel
    }
}

public final class DatabaseModelConfiguration: Configuration {
    public func configure(_ app: Application) {
        app.storage[DatabaseModelStorageKey.self] = DatabaseModel(app.database)
    }
}

private struct DatabaseModelStorageKey: StorageKey {
    typealias Value = DatabaseModel
}

// MARK: - DatabaseModel + Contact
extension DatabaseModel {
    func createContact(_ contact: Contact) -> EventLoopFuture<Contact> {
        contact
            .save(on: database)
            .map { contact }
    }

    func readContact(_ contactID: Contact.IDValue) -> EventLoopFuture<Contact?> {
        Contact
            .find(contactID, on: database)
    }

    func readContact() -> EventLoopFuture<[Contact]> {
        Contact
            .query(on: database)
            .with(\.$residencies)
            .sort(\.$name, .ascending)
            .all()
    }

    func updateContact(_ contactID: Contact.IDValue, with mediator: ContactMediator) -> EventLoopFuture<Contact> {
        Contact
            .find(contactID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { contact in
                mediator.update(to: contact)
                return contact
                    .update(on: self.database)
                    .transform(to: contact)
            }
    }

    func deleteContact(_ contactID: Contact.IDValue) -> EventLoopFuture<Void> {
        Contact
            .find(contactID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { contact in
                contact
                    .delete(on: self.database)
            }
    }
}

// MARK: - DatabaseModel + Residence
extension DatabaseModel {
    func createResidence(_ residence: Residence) -> EventLoopFuture<Residence> {
        residence
            .save(on: database)
            .map { residence }
    }

    func readResidence(_ residenceID: Residence.IDValue) -> EventLoopFuture<Residence?> {
        Residence
            .find(residenceID, on: database)
    }

    func readResidence() -> EventLoopFuture<[Residence]> {
        Residence
            .query(on: database)
            .sort(\.$country, .ascending)
            .all()
    }

    func updateResidence(_ residenceID: Residence.IDValue, with mediator: ResidenceMediator) -> EventLoopFuture<Residence> {
        Residence
            .find(residenceID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { residence in
                mediator.update(to: residence)
                return residence
                    .update(on: self.database)
                    .transform(to: residence)
            }
    }

    func deleteResidence(_ residenceID: Residence.IDValue) -> EventLoopFuture<Void> {
        readResidence(residenceID)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { residence in
                residence
                    .delete(on: self.database)
            }
    }
}
