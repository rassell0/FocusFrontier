import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
     
      state.tasks.push(action.payload);
    },
    deleteTask:(state,action) =>{
        state.tasks.splice(action.payload,1)
    },
    setTasks:(state,action)=>{
        state.tasks = action.payload
    }

  },
});

export default tasksSlice.reducer;
export const { addTask,deleteTask,setTasks } = tasksSlice.actions;

