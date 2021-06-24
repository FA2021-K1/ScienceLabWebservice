import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser

public struct Example: WebService {
    // Default HTTP configuration values so the developers don't have to pass
    // these arguments in the development process themselves
    @Option
    var hostname: String = "0.0.0.0"

    @Option
    var port: Int = 8080
    
    @Flag
    var revertDatabaseMigrations: Bool = false

    private var databasePath: String {
        #if !DEBUG && os(Linux)
        // In the release configuration we store the database file in the database directory mounted as a volume
        return "/app/database/example.sqlite"
        #else
        return "./example.sqlite"
        #endif
    }

    public var configuration: Configuration {
        /// Exposed interfaces, in this case a RESTful API and an OpenAPI documentation generated with it
        REST {
            OpenAPI()
        }
        
        /// Defines on which hostname and port the webservice should be bound to, configurable via CLI-arguments, else defaults
        HTTPConfiguration(hostname: hostname, port: port)
        
        /// Setup of example database (in this case SQlite) and add migrations to create the respective tables
        DatabaseConfiguration(.sqlite(.file(databasePath)))
            .addMigrations(ContactMigration())
            .addMigrations(ResidenceMigration())
        
        /// If the appropriate CLI flag is passed, revert the database migrations
        if(revertDatabaseMigrations) {
            DatabaseRevertConfiguration(.sqlite(.file(databasePath)))
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
