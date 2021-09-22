extension Collection {
    func forEach(_ body: @escaping (Element) async -> Void) async -> Void {
        await withTaskGroup(of: Void.self) { group in
            for element in self {
                group.addTask {
                    await body(element)
                }
            }
            
            await group.waitForAll()
        }
    }
}
