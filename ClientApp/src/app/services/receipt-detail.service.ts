import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReceiptDetail } from '../models/ReceiptDetail';
import { GUID } from '../app.type';

@Injectable()
export class ReceiptDetailDataService {
    private url = "/api/receipt-detail";

    constructor(private http: HttpClient) {

    }

    getReceiptDetails() {
        return this.http.get(this.url + '/' + 'ReceiptDetail');
    }

    getReceiptDetail(id: GUID) {
        return this.http.get(this.url + '/' + 'ReceiptDetail' + '/' + id);
    }

    createReceiptDetail(receiptDetail: ReceiptDetail) {
        return this.http.post(this.url, receiptDetail, { observe: 'response' });
    }

    updateReceiptDetail(receiptDetail: ReceiptDetail) {
        return this.http.put(this.url, receiptDetail);
    }

    deleteReceiptDetail(id?: GUID) {
        return this.http.delete(this.url + '/' + id);
    }
}