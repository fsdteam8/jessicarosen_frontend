import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type Region = "canada" | "us" | "all"

interface RegionState {
  currentRegion: Region
}

const initialState: RegionState = {
  currentRegion: "canada",
}



const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<Region>) => {
      state.currentRegion = action.payload
    },
  },
})

export const { setRegion } = regionSlice.actions
export default regionSlice.reducer
