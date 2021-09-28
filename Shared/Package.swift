// swift-tools-version:5.3

import PackageDescription


let package = Package(
    name: "Shared",
    platforms: [
        .macOS(.v11),
        .iOS(.v14)
    ],
    products: [
        .library(
            name: "Shared",
            targets: ["Shared"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/vapor/fluent-kit.git", from: "1.12.0"),
        .package(url: "https://github.com/vapor-community/bcrypt.git", from: "1.1.0"),
        .package(url: "https://github.com/vapor/jwt-kit.git", from: "4.0.0")
    ],
    targets: [
        .target(
            name: "Shared",
            dependencies: [
                .product(name: "FluentKit", package: "fluent-kit"),
                .product(name: "BCrypt", package: "bcrypt"),
                .product(name: "JWTKit", package: "jwt-kit")
            ]
        ),
        .testTarget(
            name: "SharedTests",
            dependencies: ["Shared"]
        )
    ]
)
