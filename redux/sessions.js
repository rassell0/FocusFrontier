import { createSlice } from "@reduxjs/toolkit";

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    focusedTime:[]
  },
  reducers: {
    addSession: (state, action) => {
     
       
      
       // const duration = Math.floor((action.payload.endTime - action.payload.startTime) / 1000); // Duration in seconds
    
          // Add your logic to format the duration as needed
          //const formattedDuration = `${action.payload.duration % 60}s`;
    
          const sessionData = {
            startTime:action.payload.startTime, // Store start time as a string
            endTime:action.payload.endTime, // Store end time as a string
            duration: action.payload.duration,
            completed:action.payload.completed
          };
         state.sessions.push(sessionData )
      
    },
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    // Add other session-related reducers as needed
  },
});

export const { addSession, setSessions } = sessionsSlice.actions;
export default sessionsSlice.reducer;