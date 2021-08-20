import Apodini
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser
import FluentPostgresDriver

struct ExampleWebService: WebService {
    @Option(help: "The port the web service of binding to")
    var port: Int = 80
    
    var configuration: Configuration {
        // Exposed interfaces, in this case a RESTful API and an OpenAPI documentation generated with it
        REST {
            OpenAPI()
        }
        
        // Defines on which hostname and port the webservice should be bound to, configurable via CLI-arguments, else defaults
        HTTPConfiguration(port: port)
        
        // Setup of database and add migrations to create the respective tables
        DatabaseConfiguration(.postgres(hostname: "localhost", username: "vapor", password: "vapor", database: "vapor"), as: .psql)
            .addMigrations(ContactMigration())
            .addMigrations(ResidenceMigration())
    }

    var content: some Component {
        ContactComponent()
        ResidenceComponent()
    }
}

ExampleWebService.main()
