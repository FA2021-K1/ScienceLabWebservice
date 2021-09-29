
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "./mockData.json";
import axios from "axios";
import { sortByBouy } from "./sorting";
import { subDays } from "date-fns";

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
    const path = "https://data.fa.ase.in.tum.de:6969/data/aggregated";
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
    const path = "https://data.fa.ase.in.tum.de:6969/data/aggregated";
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
    const path = "https://data.fa.ase.in.tum.de:6969/data/aggregated";
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
    selectedTime: (new Date()).getTime(),
    selectedData: "pH",
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
            state.selectedData = action.payload
        }
  },
  extraReducers: {
    [getLatestData.fulfilled]: (state, action) => {
      state.latestData = action.payload;
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
      state.dataAverageByDay = action.payload;
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
      state.dataBySpan = action.payload;
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

