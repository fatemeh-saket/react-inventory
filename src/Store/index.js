import { configureStore } from "@reduxjs/toolkit";
import itemSlice from './Reducers/items-Slice'
import soldProductSlice from './Reducers/soldProducts-Slice'
import unavailableItemSlice from './Reducers/deficits-slice'
const store = configureStore({
    reducer: {
        products: itemSlice,
        soldProducts: soldProductSlice,
        unavailableProducts:unavailableItemSlice
    }
})
export default store;
