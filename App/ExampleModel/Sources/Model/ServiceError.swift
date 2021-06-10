import Combine
import Foundation

public enum ServiceError: Error {
    case loadingFailed(Codable.Type)
    case saveFailed(Codable.Type)
    case deleteFailed(Codable.Type)
    case unknown
    
    
    public var localizedDescription: String {
        switch self {
        case let .loadingFailed(type):
            return "Could not load the \(type.self)s from the server."
        case let .saveFailed(type):
            return "Could not save the \(type.self) on the server."
        case let .deleteFailed(type):
            return "Could not delete the \(type.self) on the server."
        case .unknown:
            return "An unknown error occured."
        }
    }
}
