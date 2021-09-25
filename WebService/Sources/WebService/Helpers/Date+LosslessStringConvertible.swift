import Foundation

extension Date: LosslessStringConvertible {
    public init?(_ description: String) {
        if let timeInterval = Double(description) {
            self.init(timeIntervalSince1970: timeInterval)
        }
        
        return nil
    }
}
