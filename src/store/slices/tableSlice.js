import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../shared/api/API";

export const getProductsCount = createAsyncThunk(
  "table/getProductsCount",
  async () => {
    const result = await API.getProductsCount();

    return result;
  }
);

export const getProductsInfo = createAsyncThunk(
  "table/getProductsInfo",
  async ({ offset, limit }) => {
    const ids = await API.getProductsID(offset, limit);

    const result = await API.getProductsInfo(ids.result);

    return result;
  }
);

const initialState = {
  productsCount: 0,
  table: [],
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
    changeOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsCount.fulfilled, (state, action) => {
      if (action.payload) {
        state.productsCount = action.payload.result.length;
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

export const { toggleLoader, changeOffset } = tableSlice.actions;

export default tableSlice.reducer;
