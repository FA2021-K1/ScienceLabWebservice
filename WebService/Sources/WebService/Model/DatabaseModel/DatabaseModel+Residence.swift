import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + Residence
extension DatabaseModel {
    func createResidence(_ residence: Residence) -> EventLoopFuture<Residence> {
        residence
            .save(on: database)
            .map { residence }
    }

    func readResidence(_ residenceID: Residence.IDValue) -> EventLoopFuture<Residence?> {
        Residence
            .find(residenceID, on: database)
    }

    func readResidence() -> EventLoopFuture<[Residence]> {
        Residence
            .query(on: database)
            .sort(\.$country, .ascending)
            .all()
    }

    func updateResidence(_ residenceID: Residence.IDValue, with mediator: ResidenceMediator) -> EventLoopFuture<Residence> {
        Residence
            .find(residenceID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { residence in
                mediator.update(to: residence)
                return residence
                    .update(on: self.database)
                    .transform(to: residence)
            }
    }

    func deleteResidence(_ residenceID: Residence.IDValue) -> EventLoopFuture<Void> {
        readResidence(residenceID)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { residence in
                residence
                    .delete(on: self.database)
            }
    }
}
