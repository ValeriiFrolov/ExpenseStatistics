import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReceiptListComponent } from './receipt/receipt-list/receipt-list.component';
import { ReceiptDetailComponent } from './receipt/receipt-detail/receipt-detail.component';

const appRoutes: Routes = [
    { path: '', component: ReceiptListComponent },
    { path: 'receipt-detail', component: ReceiptDetailComponent },
    { path: 'receipt-detail/:id', component: ReceiptDetailComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, ReceiptListComponent, ReceiptDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }