import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import categoriesSlice from "./categories/categoriesSlice";
import coffee_blendsSlice from "./coffee_blends/coffee_blendsSlice";
import customersSlice from "./customers/customersSlice";
import ordersSlice from "./orders/ordersSlice";
import paymentsSlice from "./payments/paymentsSlice";
import reportsSlice from "./reports/reportsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
categories: categoriesSlice,
coffee_blends: coffee_blendsSlice,
customers: customersSlice,
orders: ordersSlice,
payments: paymentsSlice,
reports: reportsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
