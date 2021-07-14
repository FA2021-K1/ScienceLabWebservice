@testable import App
import Combine
@testable import Model
import XCTest


class AppTests: XCTestCase {
    var cancellables: Set<AnyCancellable> = []
    
    
    func testEditContactViewModelChanges() throws {
        let model = MockModel()
        let person = try XCTUnwrap(model.contacts.first)
        
        let editContactViewModel = EditContactViewModel(model, id: person.id)
        XCTAssertFalse(editContactViewModel.loaded)
        
        editContactViewModel.updateStates()
        
        XCTAssertTrue(editContactViewModel.loaded)
        XCTAssertEqual(editContactViewModel.id, person.id)
        XCTAssertEqual(editContactViewModel.name, person.name)
        XCTAssertEqual(editContactViewModel.birthday, person.birthday)
        
        editContactViewModel.name = "Emma Stone"
        
        XCTAssertEqual(editContactViewModel.name, "Emma Stone")
        XCTAssertEqual(editContactViewModel.birthday, person.birthday)
        XCTAssertEqual(model.contact(try XCTUnwrap(person.id))?.name, person.name)
        XCTAssertEqual(model.contact(try XCTUnwrap(person.id))?.birthday, person.birthday)
    }
    
    func testEditContactViewModelSave() throws {
        let model = MockModel()
        let person = try XCTUnwrap(model.contacts.first)
        
        let editContactViewModel = EditContactViewModel(model, id: person.id)
        editContactViewModel.updateStates()
        editContactViewModel.name = "Emma Stone"
        
        let saveExpectation = XCTestExpectation(description: "Save Complete")
        editContactViewModel.save()
            .sink { _ in
                saveExpectation.fulfill()
            }
            .store(in: &cancellables)
        
        wait(for: [saveExpectation], timeout: 1.0)
        
        XCTAssertEqual(model.contact(try XCTUnwrap(person.id))?.name, "Emma Stone")
        XCTAssertEqual(model.contact(try XCTUnwrap(person.id))?.birthday, person.birthday)
    }
    
    func testEditContactViewModelDelete() throws {
        let model = MockModel()
        let person = try XCTUnwrap(model.contacts.first)
        
        let editContactViewModel = EditContactViewModel(model, id: person.id)
        editContactViewModel.updateStates()
        
        let deleteExpectation = XCTestExpectation(description: "Delete Complete")
        editContactViewModel.delete()
            .sink { _ in
                deleteExpectation.fulfill()
            }
            .store(in: &cancellables)
        
        wait(for: [deleteExpectation], timeout: 1.0)
        
        XCTAssertNil(model.contact(try XCTUnwrap(person.id)))
    }
}
