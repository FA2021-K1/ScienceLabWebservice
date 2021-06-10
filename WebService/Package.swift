// swift-tools-version:5.3

import PackageDescription


let package = Package(
    name: "WebService",
    platforms: [
        .macOS(.v11)
    ],
    products: [
        .executable(name: "WebService", targets: ["WebService"])
    ],
    dependencies: [
        .package(url: "https://github.com/Apodini/Apodini.git", .branch("feature/improveTests")),
        .package(url: "https://github.com/swift-server/async-http-client.git", from: "1.3.0"),
        .package(path: "../Shared")
    ],
    targets: [
        .target(
            name: "WebService",
            dependencies: [
                .target(name: "ExampleWebService")
            ]
        ),
        .target(
            name: "ExampleWebService",
            dependencies: [
                .product(name: "Apodini", package: "Apodini"),
                .product(name: "ApodiniREST", package: "Apodini"),
                .product(name: "ApodiniOpenAPI", package: "Apodini"),
                .product(name: "ApodiniDatabase", package: "Apodini"),
                .product(name: "AsyncHTTPClient", package: "async-http-client"),
                .product(name: "Shared", package: "Shared")
            ]
        ),
        .testTarget(
            name: "ExampleWebServiceTests",
            dependencies: [
                .product(name: "XCTApodini", package: "Apodini"),
                .product(name: "XCTApodiniDatabase", package: "Apodini"),
                .target(name: "ExampleWebService")
            ]
        )
    ]
)
