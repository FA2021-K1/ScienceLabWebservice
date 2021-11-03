import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    updateSidebar: (state = initialState, action) => {
      return { ...state, open: action.payload };
    }
  },
});

export const { updateSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer