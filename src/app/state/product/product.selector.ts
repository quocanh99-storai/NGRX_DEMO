import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "src/app/models/product.model";
import { ProductState } from "./product.reducer";

export const selectProductState = createFeatureSelector<ProductState>("products")

// Getting the products
export const selectProducts = createSelector(
    selectProductState,
    state => state.products
)

// Fecting loading
export const selectLoading = createSelector(
    selectProductState,
    state => state.loading
)

export const selectLoaded = createSelector(
    selectProductState,
    state => state.loaded
)

export const selectError = createSelector(
    selectProductState,
    state => state.error
)