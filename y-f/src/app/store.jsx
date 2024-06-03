import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "../features/user/userAuthSlice";
import tourReducer from "../features/tour/tourSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userAuthReducer,
  tour: tourReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["tour"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
