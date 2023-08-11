import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../slicers/slicers'
 
export default configureStore({
    reducer: {
        store : cartSlice                 
    }                              
})