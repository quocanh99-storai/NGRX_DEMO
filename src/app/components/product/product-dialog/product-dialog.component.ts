import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductActionTypes, ProductAddAction } from 'src/app/state/product/product.action';
import { selectLoaded, selectLoading, selectProducts } from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  // Observable
  public loading$: Observable<boolean>;
  private _destroy$: Subject<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _store: Store<{ products: ReadonlyArray<Product> }>,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
  ) {
    this._destroy$ = new Subject();
    this.loading$ = this._store.pipe(select(selectLoading, ProductActionTypes.ADD_PRODUCT))
  }

  ngOnInit() {
    this._getForm()
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _getForm() {
    this.form = this._formBuilder.group({
      name: new FormControl({ value: null, disabled: false }, Validators.required),
      price: new FormControl({ value: null, disabled: false }, Validators.required),
    })
  }

  get f() {
    if (!this.form) { return {}; }
    return this.form.controls;
  }

  // API

  // Events
  onClose() {
    this.dialogRef.close();
  }


  // Functions
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const product: Product = {
      name: this.f.name.value,
      price: this.f.price.value
    }

    this._store.dispatch(new ProductAddAction({ product }))
    this._createProductSubcription()
  }

  private _createProductSubcription() {
    this._store.pipe(
      takeUntil(this._destroy$),
      select(selectProducts)
    )
      .subscribe(res => {
        if (!res) {
          return;
        }
        console.log('res', res)

        this.dialogRef.close(res);
      });
  }

}
