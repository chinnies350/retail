import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.ENV_API_URL;


export const getPricingType = createAsyncThunk('getPricingType/getPricingType', async ( PricingId ) => {
    return await axios.get(`${apiUrl}/pricingType?PricingId=${PricingId}`);
  });

export const postInvoice = createAsyncThunk('postInvoice/userAppMap', async (postData) => {
    return await axios.post(`${apiUrl}/userAppMap`, postData)
})