import { Stove } from './../models/stove.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class ProductService {
    constructor(private http:Http,private db: AngularFireDatabase){}
    private product: Product[]=[];
    onAdd(id: string, company: string, type: string, subtype: string, price: number, imageUrl: string) {
        this.product.push(new Product(id,company,type,subtype,price,imageUrl))
        console.log(this.product);
        return this.http.post('https://triveni-b663b.firebaseio.com/product-list/'+company+'/'+type+'/'+subtype+'.json',
        {id:id,price:price, image: imageUrl})
        .map((response: Response)=> {
            return response.json();
        })
    }
    getProducts(company: string, type: string) {
        return this.http.get('https://triveni-b663b.firebaseio.com/product-list/'+company+'/'+type+'.json')
            .map((response: Response) => {
                return response.json();
            });
    }
    onEdit(id: number, company: string, type: string, subtype: string, price: number, imageUrl: string,key: string) {
        return this.http.put('https://triveni-b663b.firebaseio.com/product-list/'+company+'/'+type+'/'+subtype+'/'+key+'.json',
        {id:id,price:price, image: imageUrl})
        .map((response: Response)=> {
            return response.json();
        })
    }
    onDelete(company: string, type: string, subtype: string,key: string) {
        return this.http.delete('https://triveni-b663b.firebaseio.com/product-list/'+company+'/'+type+'/'+subtype+'/'+key+'.json')
        .map((response: Response)=> {
            return response.json();
        })
    }
    
    create(product) { 
        return this.db.list('/products').push(product);
      } 
      getAll(company: string, type: string, subtype: string) {//the args are temp
        return this.db.list('/products');
      }
      
      get(productId) { 
        return this.db.object('/products/' + productId);
      }
    
      update(productId, product) { 
        return this.db.object('/products/' + productId).update(product);
      }
    
      delete(productId) { 
        return this.db.object('/products/' + productId).remove();
      }
         
}