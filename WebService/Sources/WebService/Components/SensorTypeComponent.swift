import Apodini
import Shared

struct SensorTypeComponent: Component {
    @PathParameter
    var sensorTypeID: SensorType.IDValue

    var content: some Component {
        Group("sensorTypes") {
            CreateSensorType()
                .operation(.create)

            GetSensorTypes()

            Group($sensorTypeID) {
                GetSensorType(sensorTypeID: $sensorTypeID)

                UpdateSensorType(sensorTypeID: $sensorTypeID)
                    .operation(.update)

                DeleteSensorType(sensorTypeID: $sensorTypeID)
                    .operation(.delete)
            }
        }
    }
}
