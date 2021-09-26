import Apodini
import Shared

struct ResidenceComponent: Component {
    @PathParameter
    var residenceId: Residence.IDValue

    var content: some Component {
        Group("residencies") {
            CreateResidence()
                .operation(.create)

            GetResidencies()

            Group($residenceId) {
                GetResidence(residenceId: $residenceId)

                DeleteResidence(residenceId: $residenceId)
                    .operation(.delete)
            }
        }
    }
}
