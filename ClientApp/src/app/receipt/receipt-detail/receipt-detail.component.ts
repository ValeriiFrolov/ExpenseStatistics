import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptDataService } from './../../services/receipt.service';
import { ReceiptDetailDataService } from './../../services/receipt-detail.service';
import { Receipt } from './../../models/Receipt';
import { Product } from './../../models/Product';
import { ReceiptDetail } from './../../models/ReceiptDetail';
import { GUID } from '../../app.type';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupPage } from '../../lookup/lookup-page'
import { ProductDataService } from '../../services/product.service';

@Component({
    templateUrl: './receipt-detail.component.html',
    providers: [ReceiptDataService, ReceiptDetailDataService, ProductDataService]
})
export class ReceiptDetailComponent implements OnInit {

    id: GUID;
    receipt: any;
    receiptdetail: any;
    receiptdetails: any;
    products: any;
    loaded: boolean = false;

    constructor(private receiptdataService: ReceiptDataService,
        private receiptDetailDataService: ReceiptDetailDataService,
        private productDataService: ProductDataService,
        private router: Router,
        activeRoute: ActivatedRoute,
        public dialog: MatDialog
    ) {
        this.id = activeRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.loadReceipts();
        this.loadReceiptDetails();
        this.loadProducts();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(LookupPage, {
            width: '500px',
            data: { dataSource: this.products, displayedColumns: ['id', 'name'], pageHeader: 'Product list' },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.receiptdetail.productId = result.id;
        });
    }

    /* Products
     */

    loadProducts() {
        this.productDataService.getProducts().subscribe((data: HttpResponse<Product>) => {
            this.products = data.body;
        });
    }


    /* Receipt
     */

    loadReceipts() {
        if (this.id) {
            this.receiptdataService.getReceipt(this.id)
                .subscribe((data: Receipt) => {
                    this.receipt = data;
                    this.loaded = true;
                });
        } else {
            this.receipt = new Receipt();
            this.loaded = true;
        }
    }

    saveReceipt() {
        if (this.receipt.id == null) {
            this.receiptdataService.createReceipt(this.receipt).subscribe((data: HttpResponse<Receipt>) => {
                this.router.navigateByUrl(this.router.url + "/" + data.body?.id);
            });

        } else {
            this.receiptdataService.updateReceipt(this.receipt).subscribe(data => this.router.navigateByUrl("/receipt"));
        }
    }

    /* Receipt Detail
     */

    loadReceiptDetails() {
        if (this.id) {
            this.receiptDetailDataService.getReceiptDetail(this.id).subscribe(data => {
                this.receiptdetails = data;
            });
        }
    }

    editReceiptDetail(rd: ReceiptDetail) {
        this.receiptdetail = rd;
        this.receiptdetail.ReceiptId = this.id;
    }


    cancelReceipt() {
        this.receipt = new Receipt();
        this.router.navigateByUrl("/receipt");
    }

    saveReceiptDetail() {
        if (this.receiptdetail.id == null) {
            this.receiptDetailDataService.createReceiptDetail(this.receiptdetail).subscribe((data: HttpResponse<ReceiptDetail>) => {
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
        this.saveReceiptDetail();
    }

    deleteReceiptDetail(rd: ReceiptDetail) {
        this.receiptDetailDataService.deleteReceiptDetail(rd.id).subscribe(data => this.loadReceiptDetails());
    }

    cancelReceiptDetail() {
        this.receiptdetail = new ReceiptDetail();
    }
}