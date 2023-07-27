import { configureStore } from '@reduxjs/toolkit'
import pricingType from '../features/pricingType/pricingType';
import bannerImage from '../features/application/bannerImage';

const store = configureStore({
    reducer: {
        pricingType: pricingType, 
        bannerImage: bannerImage,
},

})
export default store