import { EditProductPage } from './../edit-product/edit-product';

import { ProductService } from './../../service/product.service';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/switchMap';
import { getValues } from '@firebase/util';


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage  implements OnInit {
  type: string;
  company: string;
  sib=[];
  dib=[];
  tib=[];
  fib=[];
  
  constructor(
    public navParams: NavParams,
    private productService: ProductService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit () {
    this.company = this.navParams.get('company');
    this.type = this.navParams.get('type');
    console.log(this.company,this.type);
  }
  ionViewWillEnter() {
    this.productService.getProducts(this.company,this.type)

      .subscribe(
        data => {
          if(data) {
            this.sib=getValues(data.Single);
            console.log(this.sib);
            this.dib=getValues(data.Double);
            console.log(this.dib);
            this.tib=getValues(data.Triple);
            console.log(this.tib);
            this.fib=getValues(data.Four);
            console.log(this.fib);
          }
        },
        error => {
          console.log(error);
        }
      );

  }
  onEdit(id: number, price: string, image: string, subtype: string) {
    this.navCtrl.push(EditProductPage,{
      id:id,
      price: price,
      company: this.company,
      type: this.type,
      subtype: subtype,
      image: image,
      mode: 'Edit'
    })
  }
  

}