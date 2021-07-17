import XCTest


class AppUITests: XCTestCase {
    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        try super.setUpWithError()
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run.
        // The setUp method is a good place to do this.
        
        // Check if the app is installed and remove it if nescessary
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let icon = springboard.icons["App"]
        
        if icon.exists && icon.isHittable {
            icon.press(forDuration: 2)
            
            // Go through the removal process
            XCTAssertTrue(springboard.buttons["Remove App"].waitForExistence(timeout: 0.5))
            springboard.buttons["Remove App"].tap()
            
            XCTAssertTrue(springboard.alerts.buttons["Delete App"].waitForExistence(timeout: 0.5))
            springboard.alerts.buttons["Delete App"].tap()
            
            XCTAssertTrue(springboard.alerts.buttons["Delete"].waitForExistence(timeout: 0.5))
            springboard.alerts.buttons["Delete"].tap()
        }
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        try super.tearDownWithError()
    }
    
    
    func testAddContact() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        app.launchArguments = ["AppUITests"]
        app.launch()
        // Go to the new contacts screen
        app.navigationBars["Your Contacts"].buttons["Add"].tap()
        
        // Enter information
        let testField = app.tables.textFields["Name"]
        testField.tap()
        testField.typeText("Emma Stone")
        
        // Create new contact
        app.navigationBars["Create New Contact"].buttons["Save"].tap()
        
        // Go to detail view
        let elementsQuery = app.scrollViews.otherElements
        let emmaStoneButton = elementsQuery.buttons["Emma Stone"]
        emmaStoneButton.tap()
        
        // Check detail view
        XCTAssert(elementsQuery.staticTexts["Emma Stone"].exists)
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMMM d, yyyy"
        XCTAssert(elementsQuery.staticTexts[dateFormatter.string(from: Date())].exists)
    }
}
