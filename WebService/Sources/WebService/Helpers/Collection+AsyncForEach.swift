extension Collection {
    func forEach(_ body: @escaping (Element) async throws -> Void) async rethrows -> Void {
        try await withThrowingTaskGroup(of: Void.self) { group in
            for element in self {
                group.addTask {
                    try await body(element)
                }
            }
            
            try await group.waitForAll()
        }
    }
}
