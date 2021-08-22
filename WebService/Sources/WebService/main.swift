import Foundation
import Apodini
import ApodiniObserve
import ApodiniOpenAPI
import ApodiniREST
import ApodiniDatabase
import Shared
import ArgumentParser
import FluentPostgresDriver
import LoggingELK

struct ExampleWebService: WebService {
    @Option(help: "The port the web service should bind to")
    var port: Int = 80
    
    @Environment(\.eventLoopGroup)
    var eventLoopGroup
    
    @Environment(\.logger)
    var logger
    
    var configuration: Configuration {
        // Exposed interfaces, in this case a RESTful API and an OpenAPI documentation generated with it
        REST {
            OpenAPI()
        }
        
        // Defines on which hostname and port the webservice should be bound to, configurable via CLI-arguments, else defaults
        HTTPConfiguration(port: port)
        
        // Setup of ApodiniLogger with a LogstashLogHandler backend
        LoggerConfiguration(logHandlers: LogstashLogHandler.init,
                            logLevel: .info) {
            LogstashLogHandler.setup(
                hostname: ProcessInfo.processInfo.environment["LOGSTASH_HOST"] ?? "0.0.0.0",
                port: Int(ProcessInfo.processInfo.environment["LOGSTASH_PORT"] ?? "31311") ?? 31311,
                useHTTPS: false,
                eventLoopGroup: eventLoopGroup,
                backgroundActivityLogger: logger,
                uploadInterval: TimeAmount.seconds(5),
                logStorageSize: 32_000,
                maximumTotalLogStorageSize: 512_000
            )
        }
        
        // Setup of database and add migrations to create the respective tables
        DatabaseConfiguration(
            .postgres(
                hostname: ProcessInfo.processInfo.environment["POSTGRES_HOST"] ?? "0.0.0.0",
                port: Int(ProcessInfo.processInfo.environment["POSTGRES_PORT"] ?? "54321") ?? 54321,
                username: ProcessInfo.processInfo.environment["POSTGRES_USER"] ?? "default",
                password: ProcessInfo.processInfo.environment["POSTGRES_PASSWORD"] ?? "default",
                database: ProcessInfo.processInfo.environment["POSTGRES_DB"] ?? "default"),
            as: .psql)
                .addMigrations(ContactMigration())
                .addMigrations(ResidenceMigration())
    }

    var content: some Component {
        ContactComponent()
        ResidenceComponent()
    }
}

ExampleWebService.main()
