import FluentKit
import Foundation


// MARK: Contact
public final class Contact: Model {
    public static let schema = "contacts"
    
    @ID
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create)
    public var createdAt: Date?
    
    @Field(key: "name")
    public var name: String
    
    @Field(key: "birthday")
    public var birthday: Date
    
    @Children(for: \.$contact)
    public var residencies: [Residence]
    
    
    public init() { }
    
    public init(id: UUID? = nil, name: String, birthday: Date) {
        self.id = id
        self.name = name
        self.birthday = birthday
    }
}

// MARK: Contact: Equatable
extension Contact: Equatable {
    public static func == (lhs: Contact, rhs: Contact) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: Contact: Comparable
extension Contact: Comparable {
    public static func < (lhs: Contact, rhs: Contact) -> Bool {
        lhs.name < rhs.name
    }
}

// MARK: Contact: Hashable
extension Contact: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
