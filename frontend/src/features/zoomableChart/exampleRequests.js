import { subDays } from "date-fns";

path = "https://data.fa.ase.in.tum.de/data/aggregated";
//Sensor Typ abfragen und dann passenden integer eingeben
sensorType = 1;

bouyId = 1;

//anzahl an sekunden über die Werte aggregiert werden sollen
aggregationLevel = 1;

//kleiner der beiden Zeiten, als Timestamp
startDate = 1532396593;

//aktuellste Zeit
endDate = new Date().getTime();

request =
  path +
  `?sensorType=${sensorType}&bouyId=${bouyId}&aggregationLevel=${aggregationLevel}&startDate=${startDate}&endDate=${endDate}`;

today = new Date();

differentTimeFormats = {
  fiveyears: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 60 * 60 * 24 * 31,
    startDate: subDays(today, 365 * 5).getTime(),
    endDate: today.getTime(),
  },
  year: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 60 * 60 * 24 * 5,
    startDate: subDays(today, 365).getTime(),
    endDate: today.getTime(),
  },
  month: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 60 * 60 * 6,
    startDate: subDays(today, 31).getTime(),
    endDate: today.getTime(),
  },
  month: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 60 * 60 * 6,
    startDate: subDays(today, 31).getTime(),
    endDate: today.getTime(),
  },
  week: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 60 * 60,
    startDate: subDays(today, 7).getTime(),
    endDate: today.getTime(),
  },
  day: {
    sensorType: 0,
    bouyId: 0,
    aggregationLevel: 1,
    startDate: subDays(today, 1).getTime(),
    endDate: today.getTime(),
  },
};

/*
series: [{
  data: [[1324508400000, 34], [1324594800000, 54] , ... , [1326236400000, 43]]
}]d
*/
