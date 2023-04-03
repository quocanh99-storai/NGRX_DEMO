import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

// a whole state, eg. {users:[], loading: false, loaded: false, error: null}
export const selectUserState = createFeatureSelector<UserState>('userState')

// Getting the Users[]
export const selectUsers = createSelector(
    selectUserState,
    state => state.users
)

// Fecting loading
export const selectLoading = createSelector(
    selectUserState,
    state => state.loading
)

export const selectLoaded = createSelector(
    selectUserState,
    state => state.loaded
)

export const selectError = createSelector(
    selectUserState,
    state => state.error
)