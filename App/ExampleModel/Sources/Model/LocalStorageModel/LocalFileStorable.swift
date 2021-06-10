//
//  LocalFileStorable.swift
//  Model
//
//  Created by Paul Schmiedmayer on 10/11/19.
//  Copyright © 2020 TUM LS1. All rights reserved.
//

import Foundation


// MARK: - LocalFileStorable
/// An object that can be represented and stored as a local file
protocol LocalFileStorable: Codable {
    /// The file name that should be used to store the elements on the local storage
    static var fileName: String { get }
}


// MARK: LocalFileStorable + Default Implementation
extension LocalFileStorable {
    static var fileName: String {
        "\(Self.self)s"
    }
}


// MARK: LocalFileStorable + Local Storage URL
extension LocalFileStorable {
    /// The URL of the parent folder to store the LocalFileStorable in
    static var localStorageURL: URL {
        guard let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
            fatalError("Can't access the document directory in the user's home directory.")
        }
        return documentsDirectory.appendingPathComponent(Self.fileName).appendingPathExtension("json")
    }
}


// MARK: LocalFileStorable + Load & Save
extension LocalFileStorable {
    ///  Load an array of `LocalFileStorables` from a file
    ///  - Returns: An array of deserialised objects
    static func loadFromFile() -> [Self] {
        do {
            let fileWrapper = try FileWrapper(url: Self.localStorageURL, options: .immediate)
            guard let data = fileWrapper.regularFileContents else {
                throw NSError()
            }
            
            return try JSONDecoder().decode([Self].self, from: data)
        } catch _ {
            print("Could not load \(Self.self)s, the Model uses an empty collection")
            return []
        }
    }
    
    /// Save a collection of `LocalFileStorables` to a file
    /// - Parameters:
    ///    - collection: Collection of objects to be saved
    static func saveToFile(_ collection: [Self]) {
        do {
            let data = try JSONEncoder().encode(collection)
            let jsonFileWrapper = FileWrapper(regularFileWithContents: data)
            try jsonFileWrapper.write(to: Self.localStorageURL, options: FileWrapper.WritingOptions.atomic, originalContentsURL: nil)
        } catch _ {
            print("Could not save \(Self.self)s")
        }
    }
    
    /// Removes the local file that is associated with that type conforming to `LocalFileStorables`
    static func removeFile() {
        try? FileManager.default.removeItem(at: localStorageURL)
    }
}


// MARK: - Array + LocalFileStorable Extension
extension Array where Element: LocalFileStorable {
    /// Saves an array of LocalFileStorables to a file
    func saveToFile() {
        Element.saveToFile(self)
    }
}
