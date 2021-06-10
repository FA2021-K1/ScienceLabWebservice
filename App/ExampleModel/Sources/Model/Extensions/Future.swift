//
//  Future.swift
//  Model
//
//  Created by Paul Schmiedmayer on 4/9/20.
//  Copyright © 2020 TUM LS1. All rights reserved.
//

import Combine
import Foundation


// MARK: - Future + Simple Init
extension Future where Output == Void {
    /// Create a  `Future` that immediately succeeds.
    convenience init() {
        self.init { $0(.success(Void())) }
    }
}


// MARK: - Future + Promise Init
extension Future where Output == Void, Failure == Error {
    /// Creates a function that can be passed in the completion closure of a `sink` operator that maps the result to the passed in `Promise`
    /// - Parameter promise: The `Promise` that the result of the  completion closure of a `sink` operator  should be mapped to
    /// - Returns: The completion closure that can be passed to a `sink` operator
    static func map(to promise: @escaping Promise) -> ((Subscribers.Completion<Error>) -> Void) {
        func mapFunction(completion: Subscribers.Completion<Error>) {
            if case let .failure(error) = completion {
                promise(.failure(error))
            } else {
                promise(.success(Void()))
            }
        }
        
        return mapFunction
    }
}


// MARK: - Future + Delay
extension Future where Output == Void, Failure == Error {
    /// Stores the `AnyCancellable`s from the `Future.delay` calls
    private static var cancellables: Set<AnyCancellable> = []
    
    
    /// Delays the execution of the method returning a `Future<Void, Error>` by a delay defined by `delay`
    /// - Parameters:
    ///   - closure: The method returning a `Future<Void, Error>`
    ///   - delay: The delay
    /// - Returns: A `Future<Void, Error>` that completes after the `closure` completes and contains its result
    static func delay(_ closure: @escaping @autoclosure () -> Future<Output, Failure>, by delay: Double) -> Future<Output, Failure> {
        Future { promise in
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                closure()
                    .sink(receiveCompletion: { completion in
                        switch completion {
                        case .finished: promise(.success(Void()))
                        case let .failure(error): promise(.failure(error))
                        }
                    }, receiveValue: { })
                    .store(in: &cancellables)
            }
        }
    }
}
