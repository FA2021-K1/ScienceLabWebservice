import Foundation
import Shared


extension Residence: LocalFileStorable { }

extension Residence: Restful {
    static let route: URL = RestfulModel.baseURL.appendingPathComponent("residencies")
}
