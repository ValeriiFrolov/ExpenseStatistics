import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDataService } from './../../services/product.service';
import { ProductPriceDataService } from './../../services/product-price.service';
import { Product } from './../../models/Product';
import { ProductPrice } from './../../models/ProductPrice';
import { GUID } from '../../app.type';

@Component({
    templateUrl: './product-detail.component.html',
    providers: [ProductDataService, ProductPriceDataService]
})
export class ProductDetailComponent implements OnInit {

    id: GUID;
    product: any;
    productprice: any;
    productprices: any;
    loaded: boolean = false;

    constructor(private productdataService: ProductDataService,
        private productPriceDataService: ProductPriceDataService,
        private router: Router,
        activeRoute: ActivatedRoute
    ) {
        this.id = activeRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.loadProducts();
        this.loadProductPrices();
    }

    /* Product
     */

    loadProducts() {
        if (this.id) {
            this.productdataService.getProduct(this.id)
                .subscribe((data: Product) => {
                    this.product = data;
                    this.loaded = true;
                });
        } else {
            this.product = new Product();
            this.loaded = true;
        }
    }

    saveProduct() {
        if (this.product.id == null) {
            this.productdataService.createProduct(this.product).subscribe((data: HttpResponse<Product>) => {
                this.router.navigateByUrl(this.router.url + "/" + data.body?.id);
            });

        } else {
            this.productdataService.updateProduct(this.product).subscribe(data => this.router.navigateByUrl("/product"));
        }
    }

    /* Product Price
     */

    loadProductPrices() {
        if (this.id) {
            this.productPriceDataService.getProductPrice(this.id).subscribe(data => {
                this.productprices = data;
            });
        }
    }

    editProductPrice(pp: ProductPrice) {
        this.productprice = pp;
        this.productprice.ProductId = this.id;
    }


    cancelProduct() {
        this.product = new Product();
        this.router.navigateByUrl("/product");
    }

    saveProductPrice() {
        if (this.productprice.id == null) {
            this.productPriceDataService.createProductPrice(this.productprice).subscribe((data: HttpResponse<ProductPrice>) => {
                this.loadProductPrices();
            });

        } else {
            this.productPriceDataService.updateProductPrice(this.productprice).subscribe(data => {
                this.loadProductPrices();
            });
        }

        this.cancelProductPrice();
    }

    addProductPrice() {
        this.productprice = new ProductPrice();
        this.productprice.ProductId = this.id;
        this.saveProductPrice();
    }

    deleteProductPrice(pp: ProductPrice) {
        this.productPriceDataService.deleteProductPrice(pp.id).subscribe(data => this.loadProductPrices());
    }

    cancelProductPrice() {
        this.productprice = new ProductPrice();
    }
}