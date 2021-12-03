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
        .package(url: "https://github.com/Apodini/Apodini.git", .upToNextMinor(from: "0.6.1")),
        .package(url: "https://github.com/Apodini/ApodiniObservePrometheus.git", .upToNextMinor(from: "0.1.0")),
        .package(path: "../Shared"),
        .package(url: "https://github.com/vapor/fluent-postgres-driver.git", from: "2.0.0"),
        .package(url: "https://github.com/Apodini/swift-log-elk.git", from: "0.2.0"),
        .package(url: "https://github.com/vapor-community/bcrypt.git", from: "1.1.0"),
        .package(url: "https://github.com/vapor/jwt-kit.git", from: "4.0.0")
        //.package(url: "https://github.com/Kitura/Swift-JWT.git", from: "3.6.0")

    ],
    targets: [
        .executableTarget(
            name: "WebService",
            dependencies: [
                .product(name: "Apodini", package: "Apodini"),
                .product(name: "ApodiniREST", package: "Apodini"),
                .product(name: "ApodiniObserve", package: "Apodini"),
                .product(name: "ApodiniObservePrometheus", package: "ApodiniObservePrometheus"),
                .product(name: "ApodiniOpenAPI", package: "Apodini"),
                .product(name: "ApodiniDatabase", package: "Apodini"),
                .product(name: "ApodiniAuthorization", package: "Apodini"),
                .product(name: "ApodiniAuthorizationJWT", package: "Apodini"),
                .product(name: "ApodiniHTTPProtocol", package: "Apodini"),
                .product(name: "ApodiniHTTP", package: "Apodini"),
                .product(name: "Shared", package: "Shared"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),
                .product(name: "LoggingELK", package: "swift-log-elk"),
                .product(name: "BCrypt", package: "bcrypt"),
                .product(name: "JWTKit", package: "jwt-kit")
                //.product(name: "SwiftJWT", package: "Swift-JWT")
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
