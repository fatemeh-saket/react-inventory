import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
    name: "products",
    initialState: {
        // ***** لیست فروشگاهها
        storesInfo: [
            { name: "فروشگاه 1", time: "۱۴۰۲/۴/۱۷", concession: "golden", address: "چها راه کوثر", description: "" },
            { name: "فروشگاه 2", time: "۱۴۰۲/۴/۱۴", concession: "silver", address: "آزادی", description: "" },
            { name: "فروشگاه 3", time: "۱۴۰۲/۴/۱۱", concession: "silver", address: "امیرکبیر", description: "" },
            { name: "فروشگاه 4", time: "۱۴۰۲/۴/۱۴", concession: "golden", address: "بلوار جمهوری", description: "" }
        ],
        // ***** لیست تمام محصولات
        items: [
            {
                title: "کاغذ کاپ کیک",
                price: "3000",
                totalNumber: "100",
                type: "notImport",
                weight: "0",
                image: require("../../assets/image/cupCake.png"),
                detail: [{ number: 20, time: "۱۴۰۲/۴/۱۴" }, { number: 10, time: "۱۴۰۲/۴/۱۷" }],
                description: "ffff",
                counterUnit: "number"
            },
            {
                title: "قالب کیک",
                price: "60000",
                totalNumber: "8",
                type: "import",
                weight: "0",
                image: require("../../assets/image/ghaleb.png"),
                detail: [{ number: 2, time: "۱۴۰۲/۵/۱۱" }, { number: 10, time: "۱۴۰۲/۵/۱۷" }],
                description: "",
                counterUnit: "number"
            },
            {
                title: "ارد سفید",
                price: "10000",
                totalNumber: "0",
                type: "notImport",
                weight: "4",
                image: require("../../assets/image/ard.png"),
                detail: [{ number: 20, time: "۱۴۰۲/۴/۱۱" }, { number: 10, time: "۱۴۰۲/۵/۱۷" }],
                description: "",
                counterUnit: "weight"
            },
            {
                title: "ارد ذرت",
                price: "12000",
                totalNumber: "0",
                type: "notImport",
                weight: "20",
                image: require("../../assets/image/podre-neshaste-zorat-ruysa.png"),
                detail: [],
                description: "درجه1",
                counterUnit: "weight"
            },
            {
                title: "کرمفیل",
                price: "30000",
                totalNumber: "0",
                type: "notImport",
                weight: "38",
                image: require("../../assets/image/images.jfif"),
                detail: [],
                description: "",
                counterUnit: "weight"
            },
            {
                title: "نشاسته",
                price: "5000",
                totalNumber: "0",
                type: "notImport",
                weight: "60",
                image: require("../../assets/image/images.jfif"),
                detail: [],
                description: "",
                counterUnit: "weight"
            },
            {
                title: "ترازو",
                price: "200000",
                totalNumber: "10",
                type: "notImport",
                weight: "0",
                image: require("../../assets/image/images.jfif"),
                detail: [],
                description: "",
                counterUnit: "number"
            },
        ],
        // *****    شماره صفحه جدول
        page: 1,
        // ***** لیست محصولات سرچ شده
        search: [],

        // ***** لیست فیلتر
        filter: [],

        // *****  ایتم انتخابی
        selectedItem: {},
    },
    reducers: {
        //************************ add product
        handleChangePage(state, action) {
            state.page = action.payload
        },
        handleChangeSelectedItem(state, action) {
            state.selectedItem = action.payload
        },
        addItem(state, action) {
            const data = { ...action.payload }
            state.items.splice(state.items.length, 0, data)
            if (state.items.length % 5 !== 0) {
                state.page = Math.ceil((state.items.length + 1) / 5)
            }

        },
        deleteItem(state, action) {
            //  change page if need
            if (state.items.length % 5 === 1 && state.page > Math.floor(state.items.length / 5)) {
                state.page = state.page - 1
            }
            state.items.splice(action.payload, 1)
        },
        filterItem(state, action) {
            let data = Object.keys(state.search).length !== 0 ? state.search : state.items

            if (action.payload[0].type) {
                data = data.filter(element => element.type === "import")
            }
            if (action.payload[0].price) {
                if (action.payload[1].min !== "")
                    data = data.filter(element => Number(element.price) >= Number(action.payload[1].min))
                if (action.payload[1].max !== "")
                    data = data.filter(element => Number(element.price) <= Number(action.payload[1].max))
            }
            if (action.payload[0].amount) {
                if (action.payload[2].min !== "") {
                    data = data.filter(element => (element.counterUnit === "weight" ? Number(element.weight) : Number(element.totalNumber)) >= Number(action.payload[2].min))
                }
                if (action.payload[2].max !== "") {

                    data = data.filter(element => (element.counterUnit === "weight" ? Number(element.weight) : Number(element.totalNumber)) <= Number(action.payload[2].max))
                }
            }
            state.filter = [...data]
        },
        searchItem(state, action) {
            let data = Object.keys(state.filter).length !== 0 ? state.filter : state.items

            if (action.payload === "") {
                state.search = []
            }
            else {
                state.search = data.filter(element => element.title.includes(action.payload))

            }
        },
        editItem(state, action) {
            let itemIndex = state.items.findIndex(element => element.title === state.selectedItem.title)

            if (action.payload[0] === "newValue") {
                state.selectedItem.detail.splice(state.selectedItem.detail.length, 0, { number: action.payload[1], time: new Date().toLocaleDateString('fa-IR') })
                state.items[itemIndex].detail.splice(state.items[itemIndex].detail.length, 0, { number: action.payload[1], time: new Date().toLocaleDateString('fa-IR') })

                if (state.selectedItem.counterUnit === "number") {

                    state.items.splice(itemIndex, 1, { ...state.selectedItem, totalNumber: Number(state.selectedItem.totalNumber) + action.payload[1] })
                    state.selectedItem.totalNumber = Number(action.payload[1]) + Number(state.selectedItem.totalNumber)

                }
                if (state.selectedItem.counterUnit === "weight") {
                    state.items.splice(itemIndex, 1, { ...state.selectedItem, weight: Number(state.selectedItem.weight) + Number(action.payload[1]) })
                    state.selectedItem.weight = Number(action.payload[1]) + Number(state.selectedItem.weight)

                }
            }

            if (action.payload[0] === "editLastValue") {

                state.items[itemIndex].detail.splice(state.items[itemIndex].detail.length, 0, {
                    type: action.payload[1].type === state.items[itemIndex].type ? "" : action.payload[1].type,
                    time: new Date().toLocaleDateString('fa-IR'),
                    title: action.payload[1].title === state.items[itemIndex].title ? "" : action.payload[1].title,
                    price: action.payload[1].price === state.items[itemIndex].price ? "" : action.payload[1].price
                })

                state.items.splice(itemIndex, 1,
                    {
                        ...state.items[itemIndex], price: action.payload[1].price,
                        image: action.payload[1].image, title: action.payload[1].title, type: action.payload[1].type,
                        description: action.payload[1].description
                    }
                )
            }

            if (action.payload[0] === "soldItem") {
                if (state.selectedItem.counterUnit === "number") {

                    state.items.splice(itemIndex, 1, { ...state.selectedItem, totalNumber: Number(state.selectedItem.totalNumber) - Number(action.payload[1]) })
                    state.selectedItem.totalNumber = Number(action.payload[1]) - Number(state.selectedItem.totalNumber)

                }
                if (state.selectedItem.counterUnit === "weight") {
                    state.items.splice(itemIndex, 1, { ...state.selectedItem, weight: Number(state.selectedItem.weight) - Number(action.payload[1]) })
                    state.selectedItem.weight = Number(action.payload[1]) - Number(state.selectedItem.weight)

                }
            }
        },
        addRejectItem(state, action) {
            const selectedTitle = action.payload[0]
            const amount = action.payload[1]
            const itemIndex = state.items.findIndex(element => element.title === selectedTitle)
            if (state.items[itemIndex].counterUnit === "number") {
                state.items.splice(itemIndex, 1, { ...state.items[itemIndex], totalNumber: Number(state.items[itemIndex].totalNumber) + Number(amount) })
            }
            if (state.items[itemIndex].counterUnit === "weight") {
                state.items.splice(itemIndex, 1, { ...state.items[itemIndex], weight: Number(state.items[itemIndex].weight) + Number(amount) })
            }




        }
    }
})
export const itemactions = itemSlice.actions
export default itemSlice.reducer


