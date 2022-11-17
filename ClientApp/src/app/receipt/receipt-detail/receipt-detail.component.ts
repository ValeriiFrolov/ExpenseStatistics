import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptDataService } from './../../services/receipt.service';
import { ReceiptDetailDataService } from './../../services/receipt-detail.service';
import { Receipt } from './../../models/Receipt';
import { ReceiptDetail } from './../../models/ReceiptDetail';
import { GUID } from '../../app.type';

@Component({
    templateUrl: './receipt-detail.component.html',
    providers: [ReceiptDataService, ReceiptDetailDataService]
})
export class ReceiptDetailComponent implements OnInit {

    id: GUID;
    receipt: any;
    receiptdetail: any;
    receiptdetails: any;
    loaded: boolean = false;

    constructor(private receiptdataService: ReceiptDataService, private receiptDetailDataService: ReceiptDetailDataService, private router: Router, activeRoute: ActivatedRoute) {
        this.id = activeRoute.snapshot.params["id"];
        console.log(activeRoute.snapshot);
        console.log(activeRoute.snapshot.params["id"]);
    }

    ngOnInit() {
        this.loadReceipts();
        this.loadReceiptDetails();
    }

    loadReceipts() {
        if (this.id) {
            this.receiptdataService.getReceipt(this.id)
                .subscribe((data: Receipt) => { this.receipt = data; this.loaded = true; });
        } else {
            this.receipt = new Receipt();
            this.loaded = true;
        }
    }

    loadReceiptDetails() {
        if (this.id) {
            this.receiptDetailDataService.getReceiptDetail(this.id).subscribe(data => {
                this.receiptdetails = data;
            });
        }
    }

    saveReceipt() {
        if (this.receipt.id == null) {
            this.receiptdataService.createReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {
                console.log(data);
                //this.receipt.push(data.body);
                this.router.navigateByUrl(this.router.url + "/" + data.body?.id);
            });

        } else {
            this.receiptdataService.updateReceipt(this.receipt).subscribe(data => this.router.navigateByUrl("/"));//.subscribe(data => this.loadReceipts());
        }

        //this.cancel();
    }

    editReceiptDetail(rd: ReceiptDetail) {
        this.receiptdetail = rd;
        this.receiptdetail.ReceiptId = this.id;
        //this.receiptdetail.Receipt = this.receipt;
    }

    cancelReceipt() {
        this.receipt = new Receipt();
        this.router.navigateByUrl("/");
    }

    saveReceiptDetail() {
        if (this.receiptdetail.id == null) {
            this.receiptDetailDataService.createReceiptDetail(this.receiptdetail).subscribe((data: HttpResponse<ReceiptDetail>) => {
                console.log(data);
                //this.receipt.push(data.body);
                //this.router.navigateByUrl("/" + data.body?.id);
                this.loadReceiptDetails();
            });

        } else {
            this.receiptDetailDataService.updateReceiptDetail(this.receiptdetail).subscribe(data => {
                this.loadReceiptDetails();
            });
        }

        this.cancelReceiptDetail();
    }

    addReceiptDetail() {
        this.receiptdetail = new ReceiptDetail();
        this.receiptdetail.ReceiptId = this.id;
        //this.receiptdetail.Receipt = this.receipt;
        this.saveReceiptDetail();
    }

    deleteReceiptDetail(rd: ReceiptDetail) {
        this.receiptDetailDataService.deleteReceiptDetail(rd.id).subscribe(data => this.loadReceiptDetails());
    }

    cancelReceiptDetail() {
        this.receiptdetail = new ReceiptDetail();
        //this.loadReceiptDetails()
    }
}