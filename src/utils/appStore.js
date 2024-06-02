import { configureStore } from "@reduxjs/toolkit";


const  appStore = configureStore({
    reducer: {
        // Add reducers here
        // In this reducer we have the different reducers with different slices
    }
})


export default appStore;