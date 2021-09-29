import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "./mockData.json";
import axios from "axios";
import { sortByBouy } from "./sorting";
import { subDays } from "date-fns";

const apiAdress = "https://data.fa.ase.in.tum.de/v1/measurements/frontend/";
const bouys = [0, 1, 2, 69, 360, 420];
const sensorTypes = [0, 1];
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
      console.log(action.payload);
      const latestDataUnformatted = action.payload.data.data.measurements;
      let relevantItems = {};
      let bouys = 0;

      latestDataUnformatted.forEach((element) => {
        if (
          relevantItems[element.buoyID] &&
          !relevantItems[element.buoyID][element.sensorTypeID]
        ) {
          relevantItems[element.buoyID][element.sensorTypeID] = {
            value: Math.round(element.value * 100) / 100,
            location: element.location,
            date: element.date,
          };
        } else if (!relevantItems[element.buoyID]) {
          relevantItems[element.buoyID] = {};
          relevantItems[element.buoyID][element.sensorTypeID] = {
            value: Math.round(element.value * 100) / 100,
            location: element.location,
            date: element.date,
          };
          bouys++;
        }
      });
      state.bouyCount = bouys;
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
        relevantItems[element.buoyID]
          ? relevantItems[element.buoyID].push([
              element.date,
              Math.round(element.value * 100) / 100,
            ])
          : (relevantItems[element.buoyID] = [
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
        relevantItems[element.buoyID]
          ? relevantItems[element.buoyID].push([element.date, element.value])
          : (relevantItems[element.buoyID] = [[element.date, element.value]]);
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
        relevantItems[element.buoyID]
          ? relevantItems[element.buoyID].push(element.value)
          : (relevantItems[element.buoyID] = [element.value]);
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
