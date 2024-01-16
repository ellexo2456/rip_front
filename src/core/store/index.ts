import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { appSlice } from './slices/appSlice';
import {requestFilterReducer} from "./requestFilters/reducers.tsx";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  app: appSlice.reducer,
  // filterAndActiveId: filterAndActiveIdReducer,
  requestFilters: requestFilterReducer,})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<typeof store.dispatch>();
