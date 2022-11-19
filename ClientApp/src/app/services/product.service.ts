import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../models/Product';
import { GUID } from './../app.type';

@Injectable()
export class ProductDataService {
    private url = "/api/product";

    constructor(private http: HttpClient) {

    }

    getProducts() {
        return this.http.get(this.url + '/' + 'Product', { observe: 'response' });
    }

    getProduct(id: GUID) {
        return this.http.get(this.url + '/' + Product.name + '/' + id);
    }

    createProduct(product: Product) {
        return this.http.post(this.url, product, { observe: 'response' });
    }

    updateProduct(product: Product) {
        return this.http.put(this.url, product, { observe: 'response' });
    }

    deleteProduct(id?: GUID) {
        return this.http.delete(this.url + '/' + id);
    }
}