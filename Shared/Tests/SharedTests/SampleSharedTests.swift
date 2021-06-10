import XCTest
@testable import Shared


final class SharedTests: XCTestCase {
    func testContact() {
        let emma = Contact(name: "Emma Stone", birthday: Date(timeIntervalSince1970: 594777600))
        
        XCTAssertEqual(emma.name, "Emma Stone")
        XCTAssertEqual(emma.birthday, Date(timeIntervalSince1970: 594777600))
    }
}
