import SwiftUI
import Model


@main
struct ExampleApp: App {
    @StateObject var model: Model = {
        #if DEBUG
            return RestfulModel()
        #else
            return LocalStorageModel()
        #endif
    }()
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(model)
        }
    }
}
