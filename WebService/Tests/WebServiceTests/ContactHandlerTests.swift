#if canImport(XCTApodini) && canImport(XCTApodiniDatabase)
@testable import WebService
import Shared
import XCTApodini
import XCTApodiniDatabase


final class ContactHandlerTests: XCTApodiniDatabaseTest {
    override func setUpWithError() throws {
        try super.setUpWithError()

        try addMigrations(
            ContactMigration(),
            ResidenceMigration()
        )
    }

    /// `XCTCheckHandler(handler:,mocks:,)` can be used to test a single `Handler`
    /// The result builder expects one or more elements conforming to `Mock` like
    /// - `MockRequest` to send mock requests to a `Handler`
    /// - `MockObservedListener` to test observables, e.g. if they are triggered by requests
    /// - `ExecuteClosure` to manually execute code between any other `Mock`s
    ///
    /// Here we use `MockRequest` to send a request with no parameters. The expectation is a `Name` struct with the `name` `"Robot"`.
    func testCreateContact() throws {
        let emma = Contact(name: "Emma Stone", birthday: Date(timeIntervalSince1970: 594777600))

        try XCTCheckHandler(CreateContact()) {
            MockRequest(assertion: { (returnedContact: Contact) in
                XCTAssertEqual(returnedContact.name, emma.name)
                XCTAssertEqual(returnedContact.birthday, emma.birthday)
            }) {
                NamedParameter("contact", value: emma)
            }
        }
    }

    func testGetContacts() throws {
        let emma = Contact(name: "Emma Stone", birthday: Date(timeIntervalSince1970: 594777600))
        try emma.save(on: app.database).wait()

        try XCTCheckHandler(GetContacts()) {
            MockRequest(expectation: [emma])
        }
    }

    /// This test case showcases how to pass parameters to a `MockRequest`.
    /// There are two types of `MockableParameters`:
    /// - `UnnamedParameter(_)` to create a parameter that is matched based on its type to the available parameters
    /// - `NamedParameter(, value:)` can be used to also specify the name of the parameter to make it clearer for Apodini to match the parameter to tha available `@Parameters`.
    ///
    /// Note: Apodini supports Web APIs that keep connections between different subsequent requests open, e.g. WebSockets and gRPC.
    /// Therefore the default behaviour is to keep the connections open between two dsubsequent `MockRequest`.
    /// By default open connectsion reuse all available parameters from the previous request and reuse them for the next request.
    /// In contrast to request protocol spcific exporters this can lead to unepxected behaviour in test cases that to not inlcude a sohisiticated logic to reduce paramters
    /// (`UnnamedParameters` are just aggregated, `NamedParameter` are overwritten if they have the same name).
    /// Therefore XCTApodini includes `options` for each `MockRequest`:
    /// - `subsequentRequest`: The default option. Reduces parameters: (`UnnamedParameters` are just aggregated, `NamedParameter` are overwritten if they have the same name)
    /// - `doNotReduceRequest`: Does keep the connection context around (e.g. the connection stays open between requests) but does not reduce the parameters
    /// - `doNotReuseConnection`: Creates a new connection context for the `MockRequest`.
    func testGreeeterWithParameter() throws {
        let emma = Contact(name: "Emma Stone", birthday: Date(timeIntervalSince1970: 594777600))
        try emma.save(on: app.database).wait()
        let ryan = Contact(name: "Ryan Reynolds", birthday: Date(timeIntervalSince1970: 214876800))
        try ryan.save(on: app.database).wait()

        @PathParameter var contactId: Contact.IDValue
        try XCTCheckHandler(GetContact(contactId: $contactId)) {
            MockRequest(expectation: emma) {
                UnnamedParameter(emma.id)
            }
            MockRequest(expectation: ryan, options: .doNotReuseConnection) {
                UnnamedParameter(ryan.id)
            }
        }
    }
}
#endif
