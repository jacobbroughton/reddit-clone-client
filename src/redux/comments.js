import {createSlice} from "@reduxjs/toolkit"

const comments = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addComment: (state, {payload}) => {
      const {} = payload
      return [payload, ...state]
    }
  }
})