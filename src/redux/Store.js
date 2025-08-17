import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import EcommerceSlice from "./EcommerceSlice";

// persist config
const persistConfig = {
  key: "E-commerce",
  storage,
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, EcommerceSlice);

// store
export const store = configureStore({
  reducer: {
    ecommerce: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor
export const persistor = persistStore(store);
