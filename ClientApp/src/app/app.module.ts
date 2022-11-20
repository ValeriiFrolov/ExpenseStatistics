import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MaterialListModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { GlobalNavigationComponent } from './app.global-nav';
import { ReceiptListComponent } from './receipt/receipt-list/receipt-list.component';
import { ReceiptDetailComponent } from './receipt/receipt-detail/receipt-detail.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

import { LookupPage } from './lookup/lookup-page';

const appRoutes: Routes = [
    { path: 'receipt', component: ReceiptListComponent },
    { path: 'receipt/receipt-detail', component: ReceiptDetailComponent },
    { path: 'receipt/receipt-detail/:id', component: ReceiptDetailComponent },

    { path: 'product', component: ProductListComponent },
    { path: 'product/product-detail', component: ProductDetailComponent },
    { path: 'product/product-detail/:id', component: ProductDetailComponent },

    { path: '**', redirectTo: '/receipt' }
];

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), MaterialListModule, MatNativeDateModule],
    declarations: [AppComponent, GlobalNavigationComponent, ReceiptListComponent, ReceiptDetailComponent, ProductListComponent, ProductDetailComponent, LookupPage],
    bootstrap: [AppComponent]
})
export class AppModule { }