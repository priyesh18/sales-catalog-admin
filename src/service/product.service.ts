import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class ProductService {
    constructor(private http:Http){}
    private product: Product[]=[];
    onAdd(id: number, company: string, type: string, subtype: string, price: number, imageUrl: string) {
        this.product.push(new Product(id,company,type,subtype,price,imageUrl))
        console.log(this.product);
        return this.http.post('https://triveni-b663b.firebaseio.com/product-list/'+company+'/'+type+'/'+subtype+'.json',{id:id,price:price})
        .map((response: Response)=> {
            return response.json;
        })
    }
    getProducts() {
        
    }
}