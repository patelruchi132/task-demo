import { createAsyncThunk } from "@reduxjs/toolkit";

import {assetList,getDetail, getDetailHistory} from "../../api/listApi"


export const fetchAllAsset = createAsyncThunk(
    "asssetList/fetch",
    async (data, { rejectWithValue }) => {
      try {
        const response = await assetList(data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchSpecificDetail = createAsyncThunk(
    "assset/fetch",
    async (data, { rejectWithValue }) => {
      try {
        const response = await getDetail(data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );  

  export const fetchSpecificDetailHistory = createAsyncThunk(
    "asssetHistory/fetch",
    async (data, { rejectWithValue }) => {
      try {
        const response = await getDetailHistory(data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ); 

  