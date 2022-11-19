import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDataService } from './../../services/product.service';
import { Product } from './../../models/Product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './product-list.component.html',
    providers: [ProductDataService]
})
export class ProductListComponent implements OnInit {

    product: any;
    products: any;
    constructor(private productdataService: ProductDataService, private router: Router, activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.productdataService.getProducts().subscribe((data: HttpResponse<Product>) => {
            console.log(data);
            this.products = data.body;
        });
    }

    saveProduct() {
        if (this.product.id == null) {
            this.productdataService.createProduct(this.product).subscribe((data: HttpResponse<Product>) => {

            });

        } else {
            this.productdataService.updateProduct(this.product).subscribe((data: HttpResponse<Product>) => {
                
            });
        }

        this.cancelProduct();
    }

    cancelProduct() {
        this.product = new Product();
        this.router.navigateByUrl('/product');
    }

    editProduct(p: Product) {
        this.product = p;
    }

    deleteProduct(p: Product) {
        this.productdataService.deleteProduct(p.id).subscribe(data => this.loadProducts());
    }

    addProduct() {
        this.router.navigateByUrl("/product/product-detail");
    }
}