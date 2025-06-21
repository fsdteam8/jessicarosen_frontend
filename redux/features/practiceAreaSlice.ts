import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PracticeAreaState {
  selectedArea: {
    id: string
    name: string
  } | null
}

const initialState: PracticeAreaState = {
  selectedArea: null,
}

const practiceAreaSlice = createSlice({
  name: 'practiceArea',
  initialState,
  reducers: {
    setSelectedArea(state, action: PayloadAction<{ id: string; name: string }>) {
      state.selectedArea = action.payload
    },
    clearSelectedArea(state) {
      state.selectedArea = null
    },
  },
})

export const { setSelectedArea, clearSelectedArea } = practiceAreaSlice.actions

export default practiceAreaSlice.reducer
