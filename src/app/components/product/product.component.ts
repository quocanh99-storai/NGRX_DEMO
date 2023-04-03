import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductAddAction, ProductLoadingAction, ProductRemoveAction } from '../../state/product/product.action'
import * as ProductSelector from 'src/app/state/product/product.selector';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})

export class ProductComponent implements OnInit {
  product$ = this._store.select(ProductSelector.selectProducts)
  loading$ = this._store.select(ProductSelector.selectLoading)
  loaded$ = this._store.select(ProductSelector.selectLoaded)
  error$ = this._store.select(ProductSelector.selectError)

  displayedColumns: string[] = ['position', 'name', 'price', 'actions'];
  dataSource = this.product$;
  // addProduct() {
  //   const product: Product = {
  //     id: 1,
  //     name: 'product' + 1,
  //     price: 100
  //   }

  //   this.store.dispatch(ProductActions.addProduct({ product }))
  // }

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
      console.log(`Dialog result: ${result}`);
    });

    // const product: Product = {
    //   id: Math.random(),
    //   name: 'Benly' + Math.random(),
    //   price: 205502
    // }
    // this._store.dispatch(new ProductAddAction({ product }))
    // this.getProductsList()
  }

  removeProduct(id: number) {
    this._store.dispatch(new ProductRemoveAction({ id }))
    this.getProductsList()
  }
}
