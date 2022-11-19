import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductPrice } from '../models/ProductPrice';
import { GUID } from '../app.type';

@Injectable()
export class ProductPriceDataService {
    private url = "/api/product-price";

    constructor(private http: HttpClient) {

    }

    getProductPrices() {
        return this.http.get(this.url + '/' + 'ProductPrice');
    }

    getProductPrice(id: GUID) {
        return this.http.get(this.url + '/' + 'ProductPrice' + '/' + id);
    }

    createProductPrice(productPrice: ProductPrice) {
        return this.http.post(this.url, productPrice, { observe: 'response' });
    }

    updateProductPrice(productPrice: ProductPrice) {
        return this.http.put(this.url, productPrice);
    }

    deleteProductPrice(id?: GUID) {
        return this.http.delete(this.url + '/' + id);
    }
}