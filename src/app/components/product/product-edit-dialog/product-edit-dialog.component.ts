import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
// import { cloneDeep } from "lodash";
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductActionTypes, ProductEditAction } from 'src/app/state/product/product.action';
import { selectLoading, selectProducts } from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public product: Product;

  // Observable
  public loading$: Observable<boolean>;
  private _destroy$: Subject<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _store: Store<{ products: ReadonlyArray<Product> }>,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
  ) {
    this._destroy$ = new Subject();
    this.loading$ = this._store.pipe(select(selectLoading, ProductActionTypes.EDIT_PRODUCT))
    this._getForm();
  }

  ngOnInit() {
    if (this.data) {
      this.product = this.data
      this.f.name.setValue(this.product.name);
      this.f.price.setValue(this.product.price);
    }
    
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

 

  get f() {
    if (!this.form) { return {}; }
    return this.form.controls;
  }

  // API
  // Events
  // Functions
  onSubmit() {
    const productId = this.product.id
    const product: Product = {
      id: productId,
      name: this.f.name.value,
      price: this.f.price.value,
    }
    
    this._store.dispatch(new ProductEditAction({ model: product }))
    this._updateProductSubcription()
  }

  onClose() {
    this.dialogRef.close();
  }

  private _getForm() {
    this.form = this._formBuilder.group({
      name: new FormControl({ value: null, disabled: false }, Validators.required),
      price: new FormControl({ value: null, disabled: false }, Validators.required),
    })
  }

  private _updateProductSubcription() {
    this._store.pipe(
      takeUntil(this._destroy$),
      select(selectProducts)
    )
      .subscribe(res => {
        if (!res) {
          return;
        }
        this.dialogRef.close(res);
      });
  }
}
