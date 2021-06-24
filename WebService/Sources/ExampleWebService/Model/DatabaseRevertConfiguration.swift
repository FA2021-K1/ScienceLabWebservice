import Apodini
import ApodiniDatabase
import Fluent
@_implementationOnly import FluentSQLiteDriver
@_implementationOnly import FluentMySQLDriver
@_implementationOnly import FluentPostgresDriver
@_implementationOnly import FluentMongoDriver

public final class DatabaseRevertConfiguration: Configuration {
    private let type: DatabaseType
    private(set) var migrations: [Migration] = []

    public var databaseID: DatabaseID {
        switch type {
        case .defaultMongoDB:
            return .mongo
        case .defaultMySQL, .mySQL:
            return .mysql
        case .defaultPostgreSQL, .postgreSQL:
            return .psql
        case .sqlite:
            return .sqlite
        }
    }

    /// Initializes a new database configuration
    ///
    /// - Parameters:
    ///     - type: The database type specified by an `DatabaseType`object.
    public init(_ type: DatabaseType) {
        self.type = type
    }

    public func configure(_ app: Application) {
        do {
            let databases = app.databases
            let factory = try databaseFactory(for: self.type)
            databases.use(factory, as: databaseID)
            app.migrations.add(migrations)
            try app.autoRevert().wait()
        } catch {
            app.logger.error("Could not revert the database: \(error)")
        }
    }

    /// A modifier to add one or more `Migrations` to the database. The given `Migrations` need to conform to the `Vapor.Migration ` class.
    ///
    /// - Parameters:
    ///     - migrations: One or more `Migration` objects that should be migrated by the database
    public func addMigrations(_ migrations: Migration...) -> Self {
        self.migrations.append(contentsOf: migrations)
        return self
    }

    private func databaseFactory(for type: DatabaseType) throws -> Fluent.DatabaseConfigurationFactory {
        switch type {
        case .defaultMongoDB(let conString):
            return try .mongo(connectionString: conString)
        case .sqlite(let config):
            let sqliteConfiguration: SQLiteConfiguration
            switch config {
            case .memory:
                sqliteConfiguration = .init(storage: .memory)
            case .file(let path):
                sqliteConfiguration = .init(storage: .file(path: path))
            }
            return .sqlite(sqliteConfiguration)
        case .defaultPostgreSQL(let conString):
            return try .postgres(url: conString)
        case let .postgreSQL(hostName, port, username, password, database, configuration):
            return .postgres(hostname: hostName, port: port, username: username, password: password, database: database, tlsConfiguration: configuration)
        case .defaultMySQL(let conString):
            return try .mysql(url: conString)
        case let .mySQL(hostname, username, password, database, configuration):
            return .mysql(hostname: hostname, username: username, password: password, database: database, tlsConfiguration: configuration)
        }
    }
}
