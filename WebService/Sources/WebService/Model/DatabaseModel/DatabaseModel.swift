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
            DatabaseModelConfiguration(database: self.database)
                .configure(self)
            return self.databaseModel
        }

        return databaseModel
    }
}

public final class DatabaseModelConfiguration: Configuration {
    let database: Database
    
    public init(database: Database) {
        self.database = database
    }
    
    public func configure(_ app: Application) {
        app.storage[DatabaseModelStorageKey.self] = DatabaseModel(self.database)
    }
}

private struct DatabaseModelStorageKey: StorageKey {
    typealias Value = DatabaseModel
}
