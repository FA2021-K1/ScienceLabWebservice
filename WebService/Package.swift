// swift-tools-version:5.5

import PackageDescription

let package = Package(
    name: "ScienceLabWebservice",
    platforms: [
        .macOS(.v12)
    ],
    products: [
        .executable(name: "WebService", targets: ["WebService"])
    ],
    dependencies: [
        .package(url: "https://github.com/Apodini/Apodini.git", .branch("feature/metrics")),
        //.package(url: "https://github.com/Apodini/Apodini.git", from: "0.5.0"),
        //.package(path: "../../Apodini"),
        .package(path: "../Shared"),
        .package(url: "https://github.com/vapor/fluent-postgres-driver.git", from: "2.0.0"),
        .package(url: "https://github.com/Apodini/swift-log-elk.git", from: "0.2.0")
    ],
    targets: [
        .executableTarget(
            name: "WebService",
            dependencies: [
                .product(name: "Apodini", package: "Apodini"),
                .product(name: "ApodiniREST", package: "Apodini"),
                .product(name: "ApodiniObserve", package: "Apodini"),
                .product(name: "ApodiniObserveMetricsPrometheus", package: "Apodini"),
                .product(name: "ApodiniOpenAPI", package: "Apodini"),
                .product(name: "ApodiniDatabase", package: "Apodini"),
                .product(name: "Shared", package: "Shared"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),
                .product(name: "LoggingELK", package: "swift-log-elk")
            ]
        ),
        /*
        .target(
            name: "WebService",
            dependencies: [
                .product(name: "Apodini", package: "Apodini"),
                .product(name: "ApodiniREST", package: "Apodini"),
                .product(name: "ApodiniOpenAPI", package: "Apodini"),
                .product(name: "ApodiniDatabase", package: "Apodini"),
                .product(name: "Shared", package: "Shared"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver")
            ]
        ),
         */
        .testTarget(
            name: "WebServiceTests",
            dependencies: [
                //.product(name: "XCTApodini", package: "Apodini"),
                //.product(name: "XCTApodiniDatabase", package: "Apodini"),
                .target(name: "WebService")
            ]
        )
    ]
)
