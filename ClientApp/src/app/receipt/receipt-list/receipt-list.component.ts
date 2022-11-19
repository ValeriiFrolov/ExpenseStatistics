import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReceiptDataService } from './../../services/receipt.service';
import { Receipt } from './../../models/Receipt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './receipt-list.component.html',
    providers: [ReceiptDataService]
})
export class ReceiptListComponent implements OnInit {

    receipt: any;
    receipts: any;
    constructor(private receiptdataService: ReceiptDataService, private router: Router, activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadReceipts();
    }

    loadReceipts() {
        this.receiptdataService.getReceipts().subscribe((data: HttpResponse<Receipt>) => {
            console.log(data);
            this.receipts = data.body;
        });
    }

    saveReceipt() {
        if (this.receipt.id == null) {
            this.receiptdataService.createReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {

            });

        } else {
            this.receiptdataService.updateReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {
                
            });
        }

        this.cancelReceipt();
    }

    cancelReceipt() {
        this.receipt = new Receipt();
        this.router.navigateByUrl("/receipt");
    }

    editReceipt(r: Receipt) {
        this.receipt = r;
    }

    deleteReceipt(r: Receipt) {
        this.receiptdataService.deleteReceipt(r.id).subscribe(data => this.loadReceipts());
    }

    addReceipt() {
        this.router.navigateByUrl("/receipt/receipt-detail");
    }
}