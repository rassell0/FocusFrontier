import {configureStore } from "@reduxjs/toolkit"
import tasks from "./tasks"
import sessions from "./sessions"


export const store = configureStore({
    reducer:{tasks,sessions}
}) 