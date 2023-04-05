import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// import { cloneDeep } from "lodash";
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductEditAction } from 'src/app/state/product/product.action';

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
    // this._destroy$.next(true);
    // this._destroy$.complete();
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
  // Functions
  onSubmit() {
    console.log('test edit')
    // const product = {
    //   name: this.f.name.value,
    //   price: this.f.price.value,
    // }
    // this._store.dispatch(new ProductEditAction(product))
    this.dialogRef.close(this.product);
  }

  onClose() {
    this.dialogRef.close();
  }
}
