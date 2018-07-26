import { Product } from "../pages/models/product";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { callbackify } from "util";

@Injectable()
export class ProductService {


    
   

    constructor( public http: Http) {

    }


    async getProductByCity(locationName: string){
        return this.http.get("http://localhost:3000/productbylocation?city=" + locationName ).toPromise();
    }





    getAllProducts(callback) {
        // if (this.products.length) return this.products;
        this.http.get("http://localhost:3000/allproducts")
        .subscribe(
            result => {
                console.log(result);
                let products = result.json() as Array<Product>
                callback(null, products.reverse());
            },
            err => {
                console.log(err);
                callback(err);
            }
        )
    }
    
    getUserProducts(callback) {

        this.http.get("http://localhost:3000/myproducts")
        .subscribe(
            result => {
                console.log(result);
                let products = result.json() as Array<Product>
                callback(null, products.reverse());
            },
            err => {
                console.log(err);
                callback(err);
            }
        )
    }
}