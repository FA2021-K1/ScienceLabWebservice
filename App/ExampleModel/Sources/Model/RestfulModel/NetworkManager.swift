import Foundation
import Combine

enum NetworkManager {
    struct DataWrapper<D: Decodable>: Decodable {
        enum CodingKeys: String, CodingKey {
            case data
            case links = "_links"
        }
        
        let data: D
        let links: [String: String]
    }
    
    /// The `AnyCancellable`s that are used to track network requests made by the `NetworkManager`
    static var cancellables: Set<AnyCancellable> = []
    /// The default `Authorization` header field for requests made by the `NetworkManager`
    static var authorization: String?
    /// The `JSONEncoder` that is used to encode request bodies to JSON
    static var encoder = JSONEncoder()
    /// The `JSONDecoder` that is used to decode response bodies to JSON
    static var decoder = JSONDecoder()
    /// Creates a `URLRequest` based on the parameters that has the `Content-Type` header field set to `application/json`
    /// - Parameters:
    ///   - method: The HTTP method
    ///   - url: The `URL` of the `URLRequest`
    ///   - authorization: The value that should be added the `Authorization` header field
    ///   - body: The HTTP body that should be added to the `URLRequest`
    /// - Returns: The created `URLRequest`
    static func urlRequest(_ method: String,
                           url: URL,
                           authorization: String? = authorization,
                           body: Data? = nil) -> URLRequest {
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = method
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        if let authorization = authorization {
            urlRequest.addValue(authorization, forHTTPHeaderField: "Authorization")
        }
        urlRequest.httpBody = body
        return urlRequest
    }
    
    /// Gets a single `Element` from a `URL` specified by `route`
    /// - Parameters:
    ///     - route: The route to get the `Element` from
    ///     - authorization: The `String` that should written in the `Authorization` header field
    /// - Returns: An `AnyPublisher` that contains the `Element` from the server or or an `Error` in the case of an error
    static func getElement<Element: Decodable>(on route: URL,
                                               authorization: String? = authorization) -> AnyPublisher<Element, Error> {
        URLSession.shared.dataTaskPublisher(for:
                urlRequest("GET", url: route, authorization: authorization)
            )
            .map(\.data)
            .decode(type: DataWrapper<Element>.self, decoder: decoder)
            .map(\.data)
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
    
    /// Gets a list of `Element`s from a `URL` specified by `route`
    /// - Parameters:
    ///     - route: The route to get the `Element`s from
    ///     - authorization: The `String` that should written in the `Authorization` header field
    /// - Returns: An `AnyPublisher` that contains an `Array` of  `Element` from the server or an empty `Array` in the case of an error
    static func getElements<Element: Decodable>(on route: URL,
                                                authorization: String? = authorization) -> AnyPublisher<[Element], Error> {
        getElement(on: route, authorization: authorization)
            .eraseToAnyPublisher()
    }
    
    /// Creates an `Element`s to a `URL` specified by `route`
    /// - Parameters:
    ///     - element: The `Element` that should be created
    ///     - route: The route to get the `Element`s from
    ///     - authorization: The `String` that should written in the `Authorization` header field
    /// - Returns: An `AnyPublisher` that contains the created `Element` from the server or an `Error` in the case of an error
    static func postElement<T: Codable>(_ element: T,
                                        authorization: String? = authorization,
                                        on route: URL) -> AnyPublisher<T, Error> {
        URLSession.shared.dataTaskPublisher(for:
                urlRequest("POST", url: route, authorization: authorization, body: try? encoder.encode(element))
            )
            .map(\.data)
            .decode(type: DataWrapper<T>.self, decoder: decoder)
            .map(\.data)
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
    
    /// Updates an `Element`s to a `URL` specified by `route`
    /// - Parameters:
    ///     - element: The `Element` that should be updated
    ///     - route: The route to get the `Element`s from
    ///     - authorization: The `String` that should written in the `Authorization` header field
    /// - Returns: An `AnyPublisher` that contains the updated `Element` from the server or an `Error` in the case of an error
    static func putElement<T: Codable>(_ element: T,
                                       authorization: String? = authorization,
                                       on route: URL) -> AnyPublisher<T, Error> {
        URLSession.shared.dataTaskPublisher(for:
                urlRequest("PUT", url: route, authorization: authorization, body: try? encoder.encode(element))
            )
            .map(\.data)
            .decode(type: DataWrapper<T>.self, decoder: decoder)
            .map(\.data)
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
    
    /// Deletes a Resource identifed by an `URL` specified by `route`
    /// - Parameters:
    ///     - route: The route that identifes the resource
    ///     - authorization: The `String` that should written in the `Authorization` header field
    /// - Returns: An `AnyPublisher` that contains indicates of the deletion was successful
    static func delete(at route: URL,
                       authorization: String? = authorization) -> AnyPublisher<Void, Error> {
        URLSession.shared.dataTaskPublisher(for:
                urlRequest("DELETE", url: route, authorization: authorization)
            )
            .tryMap { _, response in
                guard let response = response as? HTTPURLResponse, 200..<299 ~= response.statusCode else {
                    throw URLError(.cannotRemoveFile)
                }
            }
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
}
