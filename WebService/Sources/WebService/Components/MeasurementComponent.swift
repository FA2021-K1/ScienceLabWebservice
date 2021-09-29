import Apodini
import Shared

struct MeasurementComponent: Component {
    @PathParameter
    var measurementId: Measurement.IDValue

    var content: some Component {
        Group("measurements") {
            Group("drone") {
                CreateMeasurement()
                    .operation(.create)
                
                GetMeasurements()
                    .guard(AuthGuardHandler())
                
                Group($measurementId) {
                    GetMeasurement(measurementId: $measurementId)
                    
                    UpdateMeasurement(measurementId: $measurementId)
                        .operation(.update)
                    
                    DeleteMeasurement(measurementId: $measurementId)
                        .operation(.delete)
                }
            }//.guard(AuthGuardHandler(allowedUserTypes: .drone, .admin))
            
            Group("frontend") {
                Group("aggregated") {
                    Group("buoy") {
                        GetBuoyAggregatedMeasurements()
                    }
                    
                    GetAggregatedMeasurements()
                }
                
                Group("sensors") {
                    GetSensors()
                }
            }//.guard(AuthGuardHandler(allowedUserTypes: .frontend, .admin))
            
            Group("admin") {
                Group("removeAll") {
                    DeleteAllMeasurements()
                        .operation(.delete)
                }
            }//.guard(AuthGuardHandler(allowedUserTypes: .admin))
        }
    }
}
