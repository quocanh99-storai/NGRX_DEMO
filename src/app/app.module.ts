import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { counterReducer } from './state/counter/counter.reducer';
import { TopNavComponent } from './components/layouts/top-nav/top-nav.component';
import { ProductComponent } from './components/product/product.component';
import { productsReducer } from './state/product/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from "@angular/common/http";
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effect';
import { ProductEfftects } from './state/product/product.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductDialogComponent } from './components/product/product-dialog/product-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductEditDialogComponent } from './components/product/product-edit-dialog/product-edit-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TopNavComponent,
    ProductComponent,
    UsersComponent,
    ProductDialogComponent,
    ProductEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule, 
    MatGridListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forRoot([UserEffects, ProductEfftects]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
