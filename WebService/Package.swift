// swift-tools-version:5.4

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
        .package(url: "https://github.com/Apodini/Apodini.git", .upToNextMinor(from: "0.3.0")),
        .package(path: "../Shared")
    ],
    targets: [
        .executableTarget(
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
                .product(name: "Shared", package: "Shared")
            ]
        ),
        .testTarget(
            name: "ExampleWebServiceTests",
            dependencies: [
                //.product(name: "XCTApodini", package: "Apodini"),
                //.product(name: "XCTApodiniDatabase", package: "Apodini"),
                .target(name: "ExampleWebService")
            ]
        )
    ]
)
