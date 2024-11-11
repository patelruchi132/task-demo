import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAsset,fetchSpecificDetail, fetchSpecificDetailHistory } from "./actions";
import { notification } from "antd";

const initialState = {
  assets: [],
 assetsLoading: false,
  assetsDetailError: null,

  assetDetail: {},
  specificAssetLoading: false,
  specificAssetError: null,

  history: [],
  loadingHistory: false,
  historyError: null
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAsset.pending, (state) => {
        state.assetsLoading = true;
        state.assetsDetailError = null;
      })
      .addCase(fetchAllAsset.fulfilled, (state, action) => {
        console.log(action.payload)
        state.assetsLoading = false;
        state.assets = action.payload

      })
      .addCase(fetchAllAsset.rejected, (state, action) => {
        state.assetsLoading = false;
        state.assetsDetailError = action.error.message;
        notification.error({
            message:action.error.message,
            description:"Something went wrong!.",
            placement: 'topRight', // you can choose 'topLeft', 'bottomLeft', 'bottomRight'
            duration: 3, // time in seconds before auto-close (set to 0 for no auto-close)
          });
      })
      .addCase(fetchSpecificDetail.pending, (state) => {
        state.specificAssetLoading = true;
        state.specificAssetError = null;
      })
      .addCase(fetchSpecificDetail.fulfilled, (state, action) => {
        console.log(action.payload)
        state.specificAssetLoading = false;
        state.assetDetail = action.payload

      })
      .addCase(fetchSpecificDetail.rejected, (state, action) => {
        state.specificAssetLoading = false;
        state.specificAssetError = action.error.message;
      })
      .addCase(fetchSpecificDetailHistory.pending, (state) => {
        state.loadingHistory = true;
        state.historyError = null;
      })
      .addCase(fetchSpecificDetailHistory.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loadingHistory = false;
        state.history = action.payload

      })
      .addCase(fetchSpecificDetailHistory.rejected, (state, action) => {
        state.loadingHistory = false;
        state.historyError = action.error.message;
      });
  },
});

export default assetsSlice.reducer;