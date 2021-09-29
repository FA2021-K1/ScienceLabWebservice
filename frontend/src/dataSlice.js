import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { subDays } from "date-fns";

const apiAdress = "https://data.fa.ase.in.tum.de/v1/measurements/frontend/";
const bouys = {
  "69": "BERND",
  "360": "PAUL",
  "420": "SCRUM",
};

const spanOptions = {
  fiveYears: { aggregationLevel: 60 * 60 * 24 * 31, dateDifference: 365 * 5 },
  oneYear: { aggregationLevel: 60 * 60 * 24 * 5, dateDifference: 365 },
  oneMonth: { aggregationLevel: 60 * 60 * 6, dateDifference: 31 },
  oneWeek: { aggregationLevel: 60 * 60, dateDifference: 7 },
  oneDay: { aggregationLevel: 1, dateDifference: 1 },
};

export const getLatestData = createAsyncThunk(
  "data/getLatestData",
  async ({ selectedTime }) => {
    const endDate = Math.round(selectedTime / 1000);
    const startDate = endDate - 10000;
    const path = apiAdress + "aggregated";
    const request = path + `?startDate=${startDate}&endDate=${endDate}`;
    const response = await axios.get(request);
    return response;
  }
);

export const getDataOfLastDay = createAsyncThunk(
  "data/getDataOfLastDay",
  async ({ selectedTime, selectedData }) => {
    const endDate = Math.round(selectedTime / 1000);
    const startDate = Math.round(
      subDays(new Date(selectedTime), 1).getTime() / 1000
    );
    const path = apiAdress + "aggregated";
    const request =
      path +
      `?startDate=${startDate}` +
      `&endDate=${endDate}` +
      `&sensorTyp=${selectedData}`;
    const response = await axios.get(request);
    return response;
  }
);

export const getDataAverageByDay = createAsyncThunk(
  "data/getDataAverageByDay",
  async ({ selectedTime, selectedData }) => {
    const endDate = Math.round(selectedTime / 1000);
    const startDate = Math.round(
      subDays(new Date(selectedTime), 7).getTime() / 1000
    );
    const aggregationLevel = 60 * 60 * 24;
    console.log(new Date(startDate));
    const path = apiAdress + "aggregated";
    const request =
      path +
      `?startDate=${startDate}` +
      `&endDate=${endDate}` +
      `&aggregationLevel=${aggregationLevel}` +
      `&sensorTyp=${selectedData}`;
    const response = await axios.get(request);
    return response;
  }
);

export const getDataBySpan = createAsyncThunk(
  "data/getDataBySpan",
  async ({ selectedData, selectedSpan }) => {
    const span = selectedSpan ? selectedSpan : "fiveYears";
    const endDate = Math.round(new Date().getTime() / 1000);
    const startDate = Math.round(
      subDays(new Date(), spanOptions[span].dateDifference).getTime() / 1000
    );
    const aggregationLevel = spanOptions[span].aggregationLevel;
    const path = apiAdress + "aggregated";
    const request =
      path +
      `?startDate=${startDate}` +
      `&endDate=${endDate}` +
      `&aggregationLevel=${aggregationLevel}` +
      `&sensorTyp=${selectedData}`;
    const response = await axios.get(request);
    return response;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    selectedTime: new Date().getTime(),
    selectedData: 0,
    bouyCount: 0,
    latestData: null,
    latestDataState: "idle",
    dataOfLastDay: null,
    dataOfLastDayStatus: "idle",
    dataAverageByDay: null,
    dataAverageByDayState: "idle",
    dataBySpan: null,
    dataBySpanState: "idle",
  },
  reducers: {
    updateSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    updateSelectedData: (state, action) => {
      const input = action.payload;
      switch (input) {
        case "pH":
          state.selectedData = 0;
          break;
        case "TDS":
          state.selectedData = 1;
          break;
        default:
          state.selectedData = -1;
      }
    },
  },
  extraReducers: {
    [getLatestData.fulfilled]: (state, action) => {
      const latestDataUnformatted = action.payload.data.data.measurements;
      let relevantItems = {};
      let bouysCount = 0;

      latestDataUnformatted.forEach((element) => {
        // const ID = typeof(bouys[element.buoyID]) === "string" ? bouys[element.buoyID] : bouys[element.buoyID.toString()];
        const ID = bouys[element.buoyID];
        console.log(element)
        console.log(bouys)
        console.log(element.buoyID)
        if (relevantItems[ID] && !relevantItems[ID][element.sensorTypeID]) {
          relevantItems[ID][element.sensorTypeID] = {
            value: Math.round(element.value * 100) / 100,
            location: element.location,
            date: element.date,
          };
        } else if (!relevantItems[ID]) {
          relevantItems[ID] = {};
          relevantItems[ID][element.sensorTypeID] = {
            value: Math.round(element.value * 100) / 100,
            location: element.location,
            date: element.date,
          };
          bouysCount++;
        }
      });
      state.bouyCount = bouysCount;
      state.latestData = relevantItems;
      state.latestDataState = "loaded";
    },
    [getLatestData.pending]: (state, action) => {
      state.latestDataState = "pending";
    },
    [getLatestData.rejected]: (state, action) => {
      state.latestDataState = "rejected";
    },

    [getDataAverageByDay.fulfilled]: (state, action) => {
      const averageDataUnformatted = action.payload.data.data.measurements;
      let relevantItems = {};
      averageDataUnformatted.forEach((element) => {
        const ID = bouys[element.buoyID];
        relevantItems[ID]
          ? relevantItems[ID].push([
              element.date,
              Math.round(element.value * 100) / 100,
            ])
          : (relevantItems[ID] = [
              [element.date, Math.round(element.value * 100) / 100],
            ]);
      });
      state.dataAverageByDay = relevantItems;
      state.dataAverageByDayState = "loaded";
    },
    [getDataAverageByDay.pending]: (state, action) => {
      state.dataAverageByDayState = "pending";
    },
    [getDataAverageByDay.rejected]: (state, action) => {
      state.dataAverageByDayState = "rejected";
    },

    [getDataBySpan.fulfilled]: (state, action) => {
      const averageDataUnformatted = action.payload.data.data.measurements;
      let relevantItems = {};
      averageDataUnformatted.forEach((element) => {
        const ID = bouys[element.buoyID];
        relevantItems[ID]
          ? relevantItems[ID].push([element.date, element.value])
          : (relevantItems[ID] = [[element.date, element.value]]);
      });
      state.dataBySpan = relevantItems;
      state.dataBySpanState = "loaded";
    },
    [getDataBySpan.pending]: (state, action) => {
      state.dataBySpanState = "pending";
    },
    [getDataBySpan.rejected]: (state, action) => {
      state.dataBySpanState = "rejected";
    },

    [getDataOfLastDay.fulfilled]: (state, action) => {
      const averageDataUnformatted = action.payload.data.data.measurements;
      let relevantItems = {};
      averageDataUnformatted.forEach((element) => {
        const ID = bouys[element.buoyID];
        relevantItems[ID]
          ? relevantItems[ID].push(element.value)
          : (relevantItems[ID] = [element.value]);
      });
      let list = [];
      for (let key in relevantItems) {
        list.push({ x: key, y: relevantItems[key] });
      }
      state.dataOfLastDay = list;
      state.dataOfLastDayStatus = "loaded";
    },
    [getDataOfLastDay.pending]: (state, action) => {
      state.dataOfLastDayStatus = "pending";
    },
    [getDataOfLastDay.rejected]: (state, action) => {
      state.dataOfLastDayStatus = "rejected";
    },
  },
});

export const { updateSelectedTime, updateSelectedData } = dataSlice.actions;

export default dataSlice.reducer;
