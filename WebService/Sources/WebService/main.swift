import Foundation
import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser
import FluentPostgresDriver

struct ExampleWebService: WebService {
    // TODO: Once bug fixed revert to dynamically configured flag
    //@Option(help: "The port the web service should bind to")
    var port: Int = 80
    
    var configuration: Configuration {
        // Exposed interfaces, in this case a RESTful API and an OpenAPI documentation generated with it
        REST {
            OpenAPI()
        }
        
        // Defines on which hostname and port the webservice should be bound to, configurable via CLI-arguments, else defaults
        HTTPConfiguration(port: port)
        
        // Setup of database and add migrations to create the respective tables
        if let username = ProcessInfo.processInfo.environment["POSTGRES_USER"],
           let password = ProcessInfo.processInfo.environment["POSTGRES_PASSWORD"],
           let databse = ProcessInfo.processInfo.environment["POSTGRES_DB"] {
            DatabaseConfiguration(
                .postgres(hostname: "postgres", port: 5432, username: username, password: password, database: databse), as: .psql)
                    .addMigrations(ContactMigration())
                    .addMigrations(ResidenceMigration())
        } else {
            DatabaseConfiguration(
                .postgres(hostname: "localhost", port: 54321, username: "default", password: "default", database: "default"), as: .psql)
                    .addMigrations(ContactMigration())
                    .addMigrations(ResidenceMigration())
        }
    }

    var content: some Component {
        ContactComponent()
        ResidenceComponent()
    }
}

ExampleWebService.main()
