import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breedReducer from '../features/dog/breedSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import {dogApi} from '../features/dog/dogApi'

export const store = configureStore({
  reducer: {
    breedStore: breedReducer,
    [dogApi.reducerPath]:dogApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dogApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch)