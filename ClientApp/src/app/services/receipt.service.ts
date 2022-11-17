import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receipt } from './../models/Receipt';
import { GUID } from './../app.type';

@Injectable()
export class ReceiptDataService {
    private url = "/api/receipt";

    constructor(private http: HttpClient) {

    }

    getReceipts() {
        return this.http.get(this.url + '/' + 'Receipt', { observe: 'response' });
    }

    getReceipt(id: GUID) {
        return this.http.get(this.url + '/' + Receipt.name + '/' + id);
    }

    createReceipt(receipt: Receipt) {
        return this.http.post(this.url, receipt, { observe: 'response' });
    }

    updateReceipt(receipt: Receipt) {
        return this.http.put(this.url, receipt, { observe: 'response' });
    }

    deleteReceipt(id?: GUID) {
        return this.http.delete(this.url + '/' + id);
    }
}