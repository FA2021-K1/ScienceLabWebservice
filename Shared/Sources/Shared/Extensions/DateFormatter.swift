import Foundation

extension DateFormatter {
    /// Ex: September 3, 2018
    public static let titleDate: DateFormatter = {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMMM d, yyyy"
        return dateFormatter
    }()
    
    /// Ex: 9/3/18
    static let onlyDate: DateFormatter = {
        let dateFormatter = DateFormatter()
        dateFormatter.timeStyle = .none
        dateFormatter.dateStyle = .medium
        return dateFormatter
    }()
}
