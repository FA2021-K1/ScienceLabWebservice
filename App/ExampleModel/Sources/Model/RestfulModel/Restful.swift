import Foundation
import Combine

protocol Restful: Codable & Identifiable & Comparable {
    static var route: URL { get }
    
    static func get() -> AnyPublisher<[Self], Error>
    
    static func delete(id: Self.ID) -> AnyPublisher<Void, Error>
    
    func post() -> AnyPublisher<Self, Error>
    
    func put() -> AnyPublisher<Self, Error>
}

extension Restful where Self.ID == UUID? {
    static func get() -> AnyPublisher<[Self], Error> {
        NetworkManager.getElements(on: Self.route)
            .eraseToAnyPublisher()
    }
    
    func post() -> AnyPublisher<Self, Error> {
        NetworkManager.postElement(self, on: Self.route)
            .eraseToAnyPublisher()
    }

    static func delete(id: Self.ID) -> AnyPublisher<Void, Error> {
        NetworkManager.delete(at: Self.route.appendingPathComponent(id?.uuidString ?? ""))
    }
    
    func put() -> AnyPublisher<Self, Error> {
        NetworkManager.putElement(self, on: Self.route.appendingPathComponent(self.id?.uuidString ?? ""))
            .eraseToAnyPublisher()
    }
}
