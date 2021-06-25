// swift-tools-version:5.3

import PackageDescription


let package = Package(
    name: "Model",
    platforms: [
        .macOS(.v11), .iOS(.v14)
    ],
    products: [
        .library(
            name: "Model",
            targets: ["Model"]
        )
    ],
    dependencies: [
        .package(path: "../../Shared")
    ],
    targets: [
        .target(
            name: "Model",
            dependencies: [
                .product(name: "Shared", package: "Shared")
            ]
        ),
        .testTarget(
            name: "ModelTests",
            dependencies: ["Model"]
        )
    ]
)
