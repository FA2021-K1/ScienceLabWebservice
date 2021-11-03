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
    
    func map<T>(_ transform: @escaping (Element) async throws -> T) async rethrows -> [T] {
        try await withThrowingTaskGroup(of: T.self, body: { group in
            for element in self {
                group.addTask {
                    return try await transform(element)
                }
            }
            
            var results = [T]()

            for try await result in group {
                results.append(result)
            }

            return results
        })
    }
}
