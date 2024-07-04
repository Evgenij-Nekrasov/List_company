import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./companies/companiesSlice";

export const store = () => {
   return configureStore({
      reducer: {
         companies: companiesReducer,
      },
   });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
