import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductAddAction, ProductLoadingAction, ProductRemoveAction } from '../../state/product/product.action'
import * as ProductSelector from 'src/app/state/product/product.selector';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})

export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Observable
  public product$ = this._store.select(ProductSelector.selectProducts)
  public loading$ = this._store.select(ProductSelector.selectLoading)
  public loaded$ = this._store.select(ProductSelector.selectLoaded)
  public error$ = this._store.select(ProductSelector.selectError)

  public displayedColumns: string[] = ['position', 'image', 'name', 'price', 'actions'];
  public dataSource = this.product$;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public resultsLength: number = 0;

  constructor(
    private _store: Store<{ products: ReadonlyArray<Product> }>,
    public dialog: MatDialog
  ) {
  }
  
  ngOnInit(): void {
    this.getProductsList()
    this.dataSource.subscribe(res => this.resultsLength = res.length);
  }

  // API
  getProductsList() {
    this._store.dispatch(new ProductLoadingAction());
  }

  // Events
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
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
