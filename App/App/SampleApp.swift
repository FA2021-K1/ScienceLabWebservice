import SwiftUI
import Model


@main
struct ExampleApp: App {
    @StateObject var model: Model = {
        #if DEBUG
            return LocalStorageModel()
        #else
            return RestfulModel()
        #endif
    }()
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(model)
        }
    }
}
