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
        .package(url: "https://github.com/Apodini/Apodini.git", .branch("develop")),
        .package(url: "https://github.com/swift-server/async-http-client.git", from: "1.3.0"),
        .package(path: "../Shared"),
        .package(url: "https://github.com/apple/swift-argument-parser", .upToNextMinor(from: "0.4.0"))
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
                .product(name: "Shared", package: "Shared"),
                .product(name: "ArgumentParser", package: "swift-argument-parser")
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
