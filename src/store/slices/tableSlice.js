import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

export const getAllProductsID = createAsyncThunk(
  "table/getAllProductsID",
  async ({ offset, limit }) => {
    const result = await API.getProductsID(offset, limit);
    return result;
  }
);

export const getProductsInfo = createAsyncThunk(
  "table/getProductsInfo",
  async (ids) => {
    const result = await API.getProductsInfo(ids);
    return result;
  }
);

const initialState = {
  table: [],
  allProductsID: [],
  loader: true,
  offset: 0,
  limit: 50,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    toggleLoader: (state) => {
      state.loader = !state.loader;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsID.fulfilled, (state, action) => {
      state.loader = false;
      if (action.payload) {
        state.allProductsID = action.payload.result;
      }
    });
    builder.addCase(getProductsInfo.fulfilled, (state, action) => {
      state.loader = false;

      if (action.payload) {
        const uniqueChain = Array.from(
          new Set(action.payload.result.map((item) => item.id))
        ).map((id) => action.payload.result.find((item) => item.id === id));

        state.table = uniqueChain;
      }
    });
  },
});

export const { toggleLoader } = tableSlice.actions;

export default tableSlice.reducer;
