import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser


public struct Example: WebService {
    // Default HTTP configuration values so the developers don't have to pass these arguments in the development process themselves
    @Option
    var hostname: String = "0.0.0.0"

    @Option
    var port: Int = 8080
    
    private var databasePath: String {
        #if !DEBUG && os(Linux)
        // In the release configuration we store the database file in the database directory mounted as a volume
        return "/app/database/example.sqlite"
        #else
        return "./example.sqlite"
        #endif
    }
    
    public var configuration: Configuration {
        REST {
            OpenAPI()
        }
        HTTPConfiguration(hostname: hostname, port: port)
        DatabaseConfiguration(.sqlite(.file(databasePath)))
        DatabaseRevertConfiguration(.sqlite(.file(databasePath)))
            .addMigrations(ContactMigration())
            .addMigrations(ResidenceMigration())
    }
    
    public var content: some Component {
        ContactComponent()
        ResidenceComponent()
    }
    
    
    public init() {}
}
