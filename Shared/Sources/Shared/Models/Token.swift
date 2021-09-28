import FluentKit
import Foundation
import JWTKit

public final class Token: Model, JWTPayload, Equatable {
    public static let schema = "tokens"
    
    @ID(custom: .string("tokenID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?
    
    @Field(key: "value")
    public var value: String?
    
    
    @Field(key: "expirationRaw")
    //public var expiration: ExpirationClaim
    public var expirationRaw: Date
    
    public var expiration: ExpirationClaim?
    
    @Field(key: "subjectRaw")
    //public var subject: SubjectClaim
    public var subjectRaw: String
     
    public var subject: SubjectClaim?
    
    @Field(key: "isAdmin")
    public var isAdmin: Bool
    
    @Parent(key: "userID")
    public var user: User

    public init() { }
    
    public init(id: UUID? = nil, value: String? = nil, expiration: ExpirationClaim, subject: SubjectClaim, isAdmin: Bool, userID: User.IDValue) {
    //public init(id: UUID? = nil, value: String? = nil, isAdmin: Bool, userID: User.IDValue) {
        self.id = id
        self.value = value
        self.expiration = expiration
        self.expirationRaw = expiration.value
        self.subject = subject
        self.subjectRaw = subject.value
        self.isAdmin = isAdmin
        self.$user.id = userID
    }
    
    public func verify(using signer: JWTSigner) throws {
        self.expiration = .init(value: self.expirationRaw)
        self.subject = .init(value: self.subjectRaw)
        try self.expiration?.verifyNotExpired()
    }
    
    public static func == (lhs: Token, rhs: Token) -> Bool {
        lhs.value == rhs.value
    }
}
