import { Action, createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export enum ProductActionTypes {
    // Loading data
    LOAD_PRODUCTS = '[PRODUCTS] Load Product',
    LOAD_PRODUCTS_SUCCESS = '[PRODUCTS] Load Product Success',
    LOAD_PRODUCTS_FAILURE = '[PRODUCTS] Load Product Failure',

    // Adding
    ADD_PRODUCT = '[PRODUCTS] Add Product',
    ADD_PRODUCT_SUCCESS = '[PRODUCTS] Add Product Success',
    ADD_PRODUCT_FAILURE = '[PRODUCTS] Add Product Failure',

    // Updating
    EDIT_PRODUCT = '[PRODUCTS] Edit Product',
    EDIT_PRODUCT_SUCCESS = '[PRODUCTS] Edit Product Success',

    // Removing
    REMOVE_PRODUCT = '[PRODUCTS] Remove Product',
    REMOVE_PRODUCT_SUCCESS = '[PRODUCTS] Remove Product Success',
    REMOVE_PRODUCT_FAILURE = '[PRODUCTS] Remove Product Failure',
}

// ------------------LOADING-------------------- //
export class ProductLoadingAction implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS;
    constructor() { }
}

export class ProductLoadingSuccessAction implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}

export class ProductLoadingFailureAction implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAILURE;
    constructor(public payload: any) { }
}


// ------------------ADD-------------------- //
export class ProductAddAction implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT;
    constructor(public payload: { product: Product }) { }
}

export class ProductAddSuccessAction implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_SUCCESS;
    constructor(public payload: { response: any }) { }
}

export class ProductAddFailureAction implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_FAILURE;
    constructor(public payload: any) { }
}

// ------------------EDIT-------------------- //
export class ProductEditAction implements Action {
    readonly type = ProductActionTypes.EDIT_PRODUCT;
    constructor(public payload: Product) { }
}

export class ProductEditSuccessAction implements Action {
    readonly type = ProductActionTypes.EDIT_PRODUCT_SUCCESS;
    constructor(public payload: Product) { }
}

// ------------------REMOVE-------------------- //
export class ProductRemoveAction implements Action {
    readonly type = ProductActionTypes.REMOVE_PRODUCT;
    constructor(public payload: { id: number }) { }
}

export class ProductRemoveSuccessAction implements Action {
    readonly type = ProductActionTypes.REMOVE_PRODUCT_SUCCESS;
    constructor(public payload: { id: number }) { }
}

export class ProductRemoveFailureAction implements Action {
    readonly type = ProductActionTypes.REMOVE_PRODUCT_FAILURE;
    constructor(public payload: any) { }
}


export type ProductActions =
    ProductLoadingAction | ProductLoadingSuccessAction | ProductLoadingFailureAction |
    ProductAddAction | ProductAddSuccessAction | ProductAddFailureAction |
    ProductEditAction | ProductEditSuccessAction |
    ProductRemoveAction | ProductRemoveSuccessAction | ProductRemoveFailureAction