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
    const endDate = selectedTime;
    const startDate = endDate - 10000000;
    const path = apiAdress + "aggregated";
    const request = path + `?startDate=${startDate}&endDate=${endDate}`;
    const response = await axios.get(request);
    return response;
  }
);

export const getDataAverageByDay = createAsyncThunk(
  "data/getDataAverageByDay",
  async ({ selectedTime, selectedData }) => {
    const endDate = selectedTime;
    const startDate = subDays(new Date(selectedTime), 7).getTime();
    const aggregationLevel = 60 * 60 * 2;
    console.log(new Date(startDate));
    const path = apiAdress + "aggregated";
    const request =
      path +
      `?startDate=${startDate}` +
      `&endDate=${endDate}` +
      `&aggregationLevel=${aggregationLevel}` +
      `?sensorType=${selectedData}`;
    const response = await axios.get(request);
    return response;
  }
);

export const getDataBySpan = createAsyncThunk(
  "data/getDataBySpan",
  async ({ selectedData, selectedSpan }) => {
    const span = selectedSpan ? selectedSpan : "fiveYears";
    const endDate = new Date().getTime();
    const startDate = subDays(
      new Date(),
      spanOptions[span].dateDifference
    ).getTime();
    const aggregationLevel = spanOptions[span].aggregationLevel;
    const path = apiAdress + "aggregated";
    const request =
      path +
      `?startDate=${startDate}` +
      `&endDate=${endDate}` +
      `&aggregationLevel=${aggregationLevel}` +
      `?sensorType=${selectedData}`;
    const response = await axios.get(request);
    return response;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    selectedTime: new Date().getTime(),
    selectedData: 0,
    latestData: null,
    latestDataState: "idle",
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
      const latestDataUnformatted = action.payload;
      const relevantItems = {};

      latestDataUnformatted.forEach((element) => {
        if (
          relevantItems[element.bouyId] &&
          !relevantItems[element.bouyId][element.sensorTypeID]
        ) {
          relevantItems[element.bouyId][element.sensorTypeID] = {
            value: element.value,
            location: element.location,
            date: element.date,
          };
        } else if (!relevantItems[element.bouyId]) {
          relevantItems[element.bouyId][element.sensorTypeID] = {
            value: element.value,
            location: element.location,
            date: element.date,
          };
        }
      });
      state.latestData = relevantItems;
      state.latestDataState = "loaded";
    },
    [getLatestData.pending]: (state, action) => {
      state.latestDataState = "pending";
    },
    [getLatestData.rejected]: (state, action) => {
      state.latestDataState = "rejected";
      state.latestData = sortByBouy(data);
    },

    [getDataAverageByDay.fulfilled]: (state, action) => {
      const averageDataUnformatted = action.payload;
      const relevantItems = {};
      averageDataUnformatted.forEach((element) => {
        relevantItems[element.bouyId]
          ? relevantItems[element.bouyId].push([element.date, element.value])
          : (relevantItems[element.bouyId] = [[element.date, element.value]]);
      });
      state.dataAverageByDay = relevantItems;
      state.dataAverageByDayState = "loaded";
    },
    [getDataAverageByDay.pending]: (state, action) => {
      state.dataAverageByDayState = "pending";
    },
    [getDataAverageByDay.rejected]: (state, action) => {
      state.dataAverageByDayState = "rejected";
      state.dataAverageByDay = sortByBouy(data);
    },

    [getDataBySpan.fulfilled]: (state, action) => {
      const averageDataUnformatted = action.payload;
      const relevantItems = {};
      averageDataUnformatted.forEach((element) => {
        relevantItems[element.bouyId]
          ? relevantItems[element.bouyId].push([element.date, element.value])
          : (relevantItems[element.bouyId] = [[element.date, element.value]]);
      });
      state.dataBySpan = relevantItems;
      state.dataBySpanState = "loaded";
    },
    [getDataBySpan.pending]: (state, action) => {
      state.dataBySpanState = "pending";
    },
    [getDataBySpan.rejected]: (state, action) => {
      state.dataBySpanState = "rejected";
      state.dataBySpan = sortByBouy(data);
    },
  },
});

export const { updateSelectedTime, updateSelectedData } = dataSlice.actions;

export default dataSlice.reducer;
