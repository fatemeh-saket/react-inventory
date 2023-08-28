import { createSlice } from "@reduxjs/toolkit";

export const soldProductSlice = createSlice({
  name: "soldProducts",
  initialState: {
    // ***** دلایل برگشت کالا
    reasonsReturn: [
      { value: "A1", titile: "خرابی محصول" },
      { value: "A2", titile: "ارسال اشتباه" },
      { value: "A3", titile: "عدم نیاز به محصول" }
    ],
    // *****   لیست تمام محصولات سفارش داده شده
    items: [
      {
        title: "قالب کیک",
        store: "فروشگاه 1",
        price: "300000",
        totalAmount: "5",
        time: "۱۴۰۲/۴/۱۱",
        statuse: "reject",
        counterUnit: "number"
      },
      {
        title: "کاغذ کاپ کیک",
        store: "فروشگاه 3",
        price: "60000",
        totalAmount: "20",
        time: "۱۴۰۲/۴/۱۱",
        statuse: "complete",
        counterUnit: "number"
      },
      {
        title: "قالب کیک",
        store: "فروشگاه 4",
        price: "120000",
        totalAmount: "2",
        time: "۱۴۰۲/۴/۱۷",
        statuse: "complete",
        counterUnit: "number"
      },
      {
        title: "کاغذ کاپ کیک",
        store: "فروشگاه 3",
        price: "60000",
        totalAmount: "20",
        time: "۱۴۰۲/۴/۱۸",
        statuse: "reject",
        counterUnit: "number"
      },
     
      {
        title: "قالب کیک",
        store: "فروشگاه 3",
        price: "350000",
        totalAmount: "5",
        time: "۱۴۰۲/۵/۱۱",
        statuse: "complete",
        counterUnit: "number"
      },
      {
        title: "ارد سفید",
        store: "فروشگاه 2",
        price: "120000",
        totalAmount: "12",
        time: "۱۴۰۲/۵/۱۷",
        statuse: "complete",
        counterUnit: "weight"
      },
      {
        title: "ارد ذرت",
        store: "فروشگاه 1",
        price: "240000",
        totalAmount: "10",
        time: "۱۴۰۲/۵/۱۷",
        statuse: "complete",
        counterUnit: "weight"
      },
      {
        title: "کرمفیل",
        store: "فروشگاه 2",
        price: "150000",
        totalAmount: "5",
        time: "۱۴۰۲/۵/۲۱",
        statuse: "complete",
        counterUnit: "weight"
      },
      {
        title: "نشاسته",
        store: "فروشگاه 4",
        price: "25000",
        totalAmount: "5",
        time: "۱۴۰۲/۵/۲۱",
        statuse: "complete",
        counterUnit: "weight"
      },
      {
        title: "ترازو",
        store: "فروشگاه 2",
        price: "400000",
        totalAmount: "2",
        time: "۱۴۰۲/۵/۲۵",
        statuse: "complete",
        counterUnit: "number"
      },
    ],
    returnIrem: [
      {
        title: "کاغذ کاپ کیک",
        store: "فروشگاه 3",
        price: "60000",
        totalAmount: "20",
        ordertime: "۱۴۰۲/۴/۱۸",
        returnTime: "۱۴۰۲/۴/۱۸",
        productReturn: false,
        reason: "A1",
        counterUnit: "number"
      },
      {
        title: "قالب کیک",
        store: "فروشگاه 1",
        price: "300000",
        totalAmount: "5",
        ordertime: "۱۴۰۲/۵/۱۱",
        returnTime: "۱۴۰۲/۵/۱۸",
        productReturn: true,
        reason: "A2",
        counterUnit: "number"
      }],
    // ***** لیست محصولات سرچ شده
    search: [],
    // ***** لیست فیلتر
    filter: [],
    // *****    شماره صفحه جدول
    requestPage: 1,
    rejectPage: 1,
    // *****      کالای انتخابی برای حذف یا برگشت
    selectedIndex: 0,
  },
  reducers: {

    changeselectedIndex(state, action) {
      state.selectedIndex = action.payload
    },
    addItem(state, action) {
      state.items.splice(state.items.length, 0, {
        title: action.payload.data.title,
        store: action.payload.store,
        price: action.payload.data.price * action.payload.totalAmount,
        totalAmount: action.payload.totalAmount,
        time: new Date().toLocaleDateString('fa-IR'),
        statuse: "complete",
        counterUnit: action.payload.data.counterUnit
      })
      if (state.items.length % 5 !== 0) {
        state.requestPage = Math.ceil((state.items.length + 1) / 5)
      }
    },
    handleChangeRequestPage(state, action) {
      state.requestPage = action.payload
    },
    handleChangeRejectPage(state, action) {
      state.rejectPage = action.payload
    },
    filterItem(state, action) {

      let data = Object.keys(state.search).length !== 0 ? state.search : state.items
      let list = []
      let stores = []

      if (action.payload[0].storeA)
        list.splice(list.length, 0, "فروشگاه 1")
      if (action.payload[0].storeB)
        list.splice(list.length, 0, "فروشگاه 2")
      if (action.payload[0].storeC)
        list.splice(list.length, 0, "فروشگاه 3")
      if (action.payload[0].storeD)
        list.splice(list.length, 0, "فروشگاه 4")


      list.map(name => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].store === name)
            stores.splice(stores.length, 0, data[i])
        }
      })

      if (action.payload[0].storeA || action.payload[0].storeB || action.payload[0].storeC || action.payload[0].storeD)
        data = [...stores]


      if (action.payload[0].compeleteOrder)
        data = data.filter(element => Object.keys(element.statuse).length === 0)
      if (action.payload[0].rejectOrder)
        data = data.filter(element => Object.keys(element.statuse).length !== 0)

      if (action.payload[1].start !== "")
        data = data.filter(element => element.time.localeCompare(action.payload[1].start) >= 0)
      if (action.payload[1].end !== "")
        data = data.filter(element => element.time.localeCompare(action.payload[1].end) <= 0)


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
    addRejectItem(state, action) {
      const reason = action.payload
      let productReturn = false
      if (reason === "A3" || reason === "A2") {
        productReturn = true
      }
      const data = { reason: reason, time: new Date().toLocaleDateString('fa-IR'), productReturn: productReturn }
      state.returnIrem.splice(state.returnIrem.length, 0, {
        title: state.items[state.selectedIndex].title,
        store: state.items[state.selectedIndex].store,
        price: state.items[state.selectedIndex].price,
        totalAmount: state.items[state.selectedIndex].totalAmount,
        ordertime: state.items[state.selectedIndex].time,
        returnTime: data.time,
        productReturn: data.returnTime,
        reason: data.reason,
        counterUnit: state.items[state.selectedIndex].counterUnit
      })
      state.items.splice(state.selectedIndex, 1, { ...state.items[state.selectedIndex], statuse: "reject" })

      if (state.returnIrem.length % 5 !== 0) {
        state.rejectPage = Math.ceil((state.returnIrem.length + 1) / 5)
      }
    },
    deleteItem(state, action) {
      //  change page if need
      if (state.items.length % 5 === 1 && state.requestPage > Math.floor(state.items.length / 5)) {
        state.requestPage = state.requestPage - 1
      }
      state.items.splice(action.payload, 1)
    },
    searchRejectItem(state, action) {
      if (action.payload === "") {
        state.search = []
      }
      else {
        state.search = state.returnIrem.filter(element => element.title.includes(action.payload))

      }
    },
  }
})
export const soldProductActions = soldProductSlice.actions
export default soldProductSlice.reducer


