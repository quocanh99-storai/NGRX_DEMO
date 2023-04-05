import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductAddAction, ProductLoadingAction, ProductRemoveAction } from '../../state/product/product.action'
import * as ProductSelector from 'src/app/state/product/product.selector';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})

export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // Observable
  product$ = this._store.select(ProductSelector.selectProducts)
  loading$ = this._store.select(ProductSelector.selectLoading)
  loaded$ = this._store.select(ProductSelector.selectLoaded)
  error$ = this._store.select(ProductSelector.selectError)

  displayedColumns: string[] = ['position', 'name', 'price', 'actions'];
  dataSource = this.product$;
  resultsLength = 0;

  // removeProduct(id: number) {
  //   this.store.dispatch(ProductActions.removeProduct({ id }))
  // }

  constructor(
    private _store: Store<{ products: ReadonlyArray<Product> }>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductsList()
  }


  // API
  getProductsList() {
    this._store.dispatch(new ProductLoadingAction());
  }

  // Functions 
  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '470px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductsList()
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '470px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductsList()
      }
    });
  }

  removeProduct(id: number) {
    this._store.dispatch(new ProductRemoveAction({ id }))
    this.getProductsList()
  }
}
