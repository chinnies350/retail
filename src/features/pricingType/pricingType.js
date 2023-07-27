import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.ENV_API_URL;


// export const getPricingType = createAsyncThunk('pricingType/getPricingType', async ({ sliderValue, toggleValue }) => {
//     return await axios.get(`${apiUrl}/pricingType?NoOfDays=${sliderValue}&Type=${toggleValue}`);
//   });

export const getPricingType = createAsyncThunk('pricingAppFeatMap/getPricingType', async ({ toggleValue,AppId,UserId }) => {
  return await axios.get(`${apiUrl}/pricingAppFeatMap?Type=${toggleValue}&AppId=${AppId}&UserId=${UserId}`);
});

export const getPricingTypeAppId = createAsyncThunk('pricingType/getPricingTypeAppId', async ({ toggleValue,AppId }) => {
  return await axios.get(`${apiUrl}/pricingType?Type=${toggleValue}&AppId=${AppId}`);
});


// export const postUserAppMap = createAsyncThunk('userAppMap/postUserAppMap', async (postData) => {
//     return await axios.post(`${apiUrl}/userAppMap`, postData)
// })

export const postFreeOption = createAsyncThunk('userAppMap/postFreeOption', async(postData) =>{
    console.log('postData',postData)
    return await axios.post(`${apiUrl}/userAppMap/FreeOption`, postData)
})

export const getUserDetails = createAsyncThunk('getUserDetail/getUserDetails', async ( UserId ) => {
    return await axios.get(`${apiUrl}/user?UserId=${UserId}`);
  });

export const SendPaymentLink = createAsyncThunk('SendPaymentLink/SendPaymentLink', async ({MobileNo,url}) => {
  console.log(MobileNo,url ,"MobileNo,Link ")
    return await axios.post(`${apiUrl}/verifyOTP/SendPaymentLink`,{"MobileNo":MobileNo,"MessageHeader":"PaymentLink","Link":url});
  });

  export const CheckPaymentStatus = createAsyncThunk('SendPaymentLink/SendPaymentLink', async ( BookingId ) => {
    return await axios.get(`${apiUrl}/userAppMap?UniqueId=${BookingId}&PaymentStatus=S`);
  });

export const UpdatePayment = createAsyncThunk('UpdatePayment/UpdatePayment', async ( putdata ) => {
    return await axios.put(`${apiUrl}/userAppMap/paymentStatus`,putdata);
  });
  // /paymentUpiDetails?activeStatus=A&type=I

export const getPaymentUpiDetails = createAsyncThunk('getPaymentUpiDeatils/getPaymentUpiDeatils', async () => {
    return await axios.get(`${apiUrl}/paymentUpiDetails?activeStatus=A&type=I`);
});

export const getPaymentModeDetails = createAsyncThunk('getPaymentUpiDeatils/getPaymentModeDeatils', async (Id) => {
  return await axios.get(`${apiUrl}/paymentUpiDetails?PaymentUPIDetailsId=${Id}`);
});

export const getUserMappDetails = createAsyncThunk('getUserMappDetails/getUserMappDetails', async (BookingId) => {
    return await axios.get(`${apiUrl}/userAppMap?UniqueId=${BookingId}`);
  });

export const sharePdfDocument = createAsyncThunk('sharePdfDocument/sharePdfDocument', async ({data}) => {
    return await axios.post(`${apiUrl}/userAppMap/send-invoicedetail`,data);
  });



  // export const getPricingFeatures = createAsyncThunk('pricingType/getPricingFeatures', async ( AppId ) => {
  //   return await axios.get(`${apiUrl}/pricingType?AppId=${AppId}&Type=F`);
  // });

  export const getPricingFeatures = createAsyncThunk('pricingAppFeatureMap/getPricingFeatures', async ( { toggleValue,AppId } ) => {
    return await axios.get(`${apiUrl}/pricingAppFeatMap?AppId=${AppId}&Type=${toggleValue}`);
  });


const initialState = {
    PricingType:[],
    PricingTypeFeat : [],
}

const pricingTypeSlice = createSlice({
    name:'pricingType',
    initialState,
    extraReducers: builder => {

        builder.addCase(getPricingType.fulfilled, (state, action)=> {
            if (action.payload.status) {
                state.PricingType = action.payload.data.data
            }
            else {
                state.PricingType = []
            }
            
        })

        builder.addCase(getPricingTypeAppId.fulfilled, (state, action)=> {
          if (action.payload.status) {
              state.PricingType = action.payload.data.data
          }
          else {
              state.PricingType = []
          }
          
      })

        builder.addCase(getPricingFeatures.fulfilled, (state, action)=> {

          if (action.payload.status) {
              state.PricingTypeFeat = action.payload.data.data
          }
          else {
              state.PricingTypeFeat = []
          }
          
      })
    }

})


export const pricingTypeSelector = state => state.PricingType?.PricingType

export const pricingTypeFeatSelector = state => state.PricingType?.PricingTypeFeat

export default pricingTypeSlice.reducer;