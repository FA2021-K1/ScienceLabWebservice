import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared


public struct Example: WebService {
    private var databasePath: String {
        #if !DEBUG && os(Linux)
        // In the release configuration we store the database file in the database directory mounted as a volume
        return "/app/database/example.sqlite"
        #else
        return "./example.sqlite"
        #endif
    }
    
    public var configuration: Configuration {
        ExporterConfiguration()
            .exporter(RESTInterfaceExporter.self)
            .exporter(OpenAPIInterfaceExporter.self)
        HTTPConfiguration()
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
