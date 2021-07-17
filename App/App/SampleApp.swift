import SwiftUI
import Model
import Foundation


@main
struct ExampleApp: App {
    @StateObject var model: Model = {
        if ProcessInfo.processInfo.arguments.contains("AppUITests") || ProcessInfo.processInfo.environment["XCODE_RUNNING_FOR_PREVIEWS"] == "1" {
            return LocalStorageModel()
        } else {
            return RestfulModel()
        }
    }()
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(model)
        }
    }
}
