import { createFeatureSelector, createReducer, on } from '@ngrx/store'
import { Product } from 'src/app/models/product.model'
import { ProductActions, ProductActionTypes } from '../product/product.action'

export interface ProductState {
    products: Product[]
    loading: boolean,
    loaded: boolean,
    error: any,
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    loaded: false,
    error: null,
}

export function productsReducer(state: ProductState = initialState, action: ProductActions): ProductState {
    console.log("state , ", state)
    switch (action.type) {
        // Loading
        case ProductActionTypes.LOAD_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case ProductActionTypes.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                products: action.payload
            }
        case ProductActionTypes.LOAD_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        // Adding
        case ProductActionTypes.ADD_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case ProductActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                products: action.payload.response
            }
        case ProductActionTypes.ADD_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error
            }

        // Edit
        case ProductActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                loading: false,
            }
        case ProductActionTypes.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: false,
            }

        // Remove
        case ProductActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case ProductActionTypes.REMOVE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                products: state.products.filter(v => v.id !== action.payload.id)

            }
        case ProductActionTypes.REMOVE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error
            }

        default:
            return state;
    }
}

export const getProductState = createFeatureSelector<ProductState>('products')