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

    save() {
        if (this.receipt.id == null) {
            this.receiptdataService.createReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {
                console.log(data);
                //this.receipt.push(data.body);
                //this.router.navigateByUrl("/" + data.body?.id);
            });

        } else {
            this.receiptdataService.updateReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {
                console.log(data);
                this.router.navigateByUrl("/");
            });//.subscribe(data => this.loadReceipts());
        }

        this.cancel();
    }

    cancel() {
        this.receipt = new Receipt();
        this.router.navigateByUrl("/");
    }

    editReceipt(r: Receipt) {
        this.receipt = r;
    }

    delete(r: Receipt) {
        this.receiptdataService.deleteReceipt(r.id).subscribe(data => this.loadReceipts());
    }

    add() {
        this.router.navigateByUrl("/receipt-detail");
    }
}