// load user, add user, remove user
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import { ProductActionTypes, ProductAddAction, ProductAddFailureAction, ProductAddSuccessAction, ProductEditAction, ProductEditSuccessAction, ProductLoadingAction, ProductLoadingSuccessAction, ProductRemoveAction, ProductRemoveFailureAction, ProductRemoveSuccessAction } from '../product/product.action';

@Injectable()

export class ProductEfftects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    // Loading
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<ProductLoadingAction>(ProductActionTypes.LOAD_PRODUCTS),
            switchMap(() => {
                return this.productService.getProducts();
            }),
            map((response) => {
                console.log('response', response)
                return new ProductLoadingSuccessAction(response)
            }),
            catchError((error, caught) => {
                of(new ProductAddFailureAction(error));
                return caught;
            })
        )
    })

    // Add
    addProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<ProductAddAction>(ProductActionTypes.ADD_PRODUCT),
            switchMap(({ payload }) => {
                return this.productService.addProduct(payload.product).pipe(
                    map(response => {
                        return new ProductAddSuccessAction({ response })
                    }),
                    catchError(error => {
                        return of(new ProductAddFailureAction(error));
                    })
                )
            })
        )
    })

    // Update
    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<ProductEditAction>(ProductActionTypes.EDIT_PRODUCT),
            switchMap(({ payload }) => {
                return this.productService.editProduct(payload)
            }),
            map((response) => {
                console.log('response edit', response)
                return new ProductEditSuccessAction(response)
            })
        )
    })

    // Remove
    removeUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<ProductRemoveAction>(ProductActionTypes.REMOVE_PRODUCT),
            switchMap(({ payload }) => {
                return this.productService.deleteProduct(payload.id).pipe(
                    map(response => {
                        return new ProductRemoveSuccessAction({ id: payload.id })
                    }),
                    catchError(error => {
                        return of(new ProductRemoveFailureAction(error));
                    })
                )
            })
        )
    })
}