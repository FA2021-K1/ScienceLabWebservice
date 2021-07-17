import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser


public struct Example: WebService {
    @Option(help: "The port the web service of binding to")
    var port: Int = 8080
    @Option(help: "The path the database file should be saved in")
    var databasePath: String = "./example.sqlite"
    @Flag(help: "Set to true if you want to revert the database migrations")
    var revertDatabaseMigrations = false
    
    
    public var configuration: Configuration {
        // Exposed interfaces, in this case a RESTful API and an OpenAPI documentation generated with it
        REST {
            OpenAPI()
        }
        
        // Defines on which hostname and port the webservice should be bound to, configurable via CLI-arguments, else defaults
        HTTPConfiguration(port: port)
        
        // If the appropriate CLI flag is passed, revert the database migrations
        if revertDatabaseMigrations {
            DatabaseRevertConfiguration(.sqlite(.file(databasePath)))
                .addMigrations(ContactMigration())
                .addMigrations(ResidenceMigration())
        } else {
            // Setup of example database (in this case SQlite) and add migrations to create the respective tables
            DatabaseConfiguration(.sqlite(.file(databasePath)))
                .addMigrations(ContactMigration())
                .addMigrations(ResidenceMigration())
        }
    }

    public var content: some Component {
        ContactComponent()
        ResidenceComponent()
    }
    
    
    public init() {}
}
