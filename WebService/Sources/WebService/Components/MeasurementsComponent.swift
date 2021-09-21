import Apodini
import Shared

struct MeasurementsComponent: Component {
    @PathParameter
    var measurementId: Measurement.IDValue

    var content: some Component {
        Group("measurements") {
            CreateMeasurement()
                .operation(.create)
            
            GetMeasurements()
            
            Group($measurementId) {
                GetMeasurement(measurementId: $measurementId)
                
                DeleteMeasurement(measurementId: $measurementId)
                    .operation(.delete)
            }
        }
    }
}
