import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../shared/api/Api";

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

export const getFilterProducts = createAsyncThunk(
  "table/getFilterProductsInfo",
  async ({ param, value }) => {
    const ids = await API.getFilterProducts(param, value);

    const products = await API.getProductsInfo(ids.result.slice(0, 50));

    return { ids, products };
  }
);

export const getFilterProductsPagination = createAsyncThunk(
  "table/getFilterProductsPagination",
  async ({ offset, limit }, thunkAPI) => {
    const state = thunkAPI.getState();

    const ids = state.table.filterProductsCount.slice(offset, offset + limit);

    const products = await API.getProductsInfo(ids);

    return products;
  }
);

const initialState = {
  productsCount: 0,
  filterProductsCount: null,
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
    removeFilterProductsCount: (state) => {
      state.filterProductsCount = null;
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

    builder.addCase(getFilterProducts.fulfilled, (state, action) => {
      state.loader = false;

      if (action.payload) {
        const uniqueChain = Array.from(
          new Set(action.payload.products.result.map((item) => item.id))
        ).map((id) =>
          action.payload.products.result.find((item) => item.id === id)
        );

        state.filterProductsCount = action.payload.ids.result;

        state.table = uniqueChain;
      }
    });

    builder.addCase(getFilterProductsPagination.fulfilled, (state, action) => {
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

export const { toggleLoader, changeOffset, removeFilterProductsCount } =
  tableSlice.actions;

export default tableSlice.reducer;
