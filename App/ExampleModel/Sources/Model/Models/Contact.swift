import Foundation
import Shared


extension Contact: LocalFileStorable { }

extension Contact: Restful {
    static let route: URL = RestfulModel.baseURL.appendingPathComponent("contacts")
}
