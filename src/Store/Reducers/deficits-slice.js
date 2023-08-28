import { createSlice } from "@reduxjs/toolkit";

export const unavailableItemSlice = createSlice({
    name: "unavailableProducts",
    initialState: {
        // *****    شماره صفحه جدول
        page: 1,
        // ***** لیست کالاهای رزرو شده فروشگاهها به دلیل کسری انبار
        items: [
            {
                title: "ارد ذرت",
                amount: "2",
                counterUnit: "weight",
                status: "غیر ضروری",
                store: "فروشگاه 2",
                time: "۱۴۰۲/۴/۹",
            },
            {
                title: "ارد سفید",
                amount: "7",
                counterUnit: "weight",
                status: "ضروری",
                store: "فروشگاه 1",
                time: "۱۴۰۲/۵/۲۱",
            }
        ]
    },
    reducers: {
        addItem(state, action) {
            state.items.splice(state.items.length, 0, action.payload)
            if (state.items.length % 5 !== 0) {
                state.page = Math.ceil((state.items.length + 1) / 5)
            }
        },
        deleteItem(state, action) {
            console.log("index", action.payload)
            //  change page if need
            if (state.items.length % 5 === 1 && state.page > Math.floor(state.items.length / 5)) {
                state.page = state.page - 1
            }
            state.items.splice(action.payload, 1)
        },
        handleChangePage(state, action) {
            state.page = action.payload
        },



    }
})
export const unavailableItemactions = unavailableItemSlice.actions
export default unavailableItemSlice.reducer


