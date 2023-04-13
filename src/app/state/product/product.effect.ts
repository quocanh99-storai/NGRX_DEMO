// load user, add user, remove user
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import { ProductActionTypes, ProductAddAction, ProductAddFailureAction, ProductAddSuccessAction, ProductEditAction, ProductEditSuccessAction, ProductLoadingAction, ProductLoadingSuccessAction, ProductRemoveAction, ProductRemoveFailureAction, ProductRemoveSuccessAction } from '../product/product.action';
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ProductEfftects {

    constructor(
        private actions$: Actions,
        private _toastr: ToastrService,
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
                if (!response) {
                    throw new Error("Sorry, We're having trouble. Please try again.");
                }

                return new ProductLoadingSuccessAction(response)
            }),
            catchError((error, caught) => {
                of(new ProductAddFailureAction(error));
                this._toastr.error('Load products list failure!');
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
                        if (!response) {
                            throw new Error("Sorry, We're having trouble. Please try again.");
                        }

                        this._toastr.success('Create product successfully!');
                        return new ProductAddSuccessAction({ response })
                    }),
                    catchError(error => {
                        this._toastr.error('Create product faliure!');
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
                return this.productService.editProduct(payload.model)
            }),
            map(response => {
                if (!response) {
                    throw new Error("Sorry, We're having trouble. Please try again.");
                }

                this._toastr.success('Update product successfully!');
                return new ProductEditSuccessAction(response)
            }),
            catchError(error => {
                this._toastr.error('Update product faliure!');
                return of(new ProductAddFailureAction(error));
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
                        if (!response) {
                            throw new Error("Sorry, We're having trouble. Please try again.");
                        }
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