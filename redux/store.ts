
// import { configureStore } from "@reduxjs/toolkit"

// import regionReducer from "./features/regionSlice"

// export const store = configureStore({
//   reducer: {
//     region: regionReducer,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch



import { configureStore } from "@reduxjs/toolkit"

import regionReducer from "./features/regionSlice"
import practiceAreaReducer from "./features/practiceAreaSlice" // ✅ Import the new slice

export const store = configureStore({
  reducer: {
    region: regionReducer,
    practiceArea: practiceAreaReducer, // ✅ Add it to the reducer map
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
