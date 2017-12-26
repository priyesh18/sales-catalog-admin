import { Stove } from './../../models/stove.model';
import { EditProductPage } from './../edit-product/edit-product';

import { ProductService } from './../../service/product.service';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';




@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage  implements OnInit {
  type: string;
  company: string;
  searchQuery: string = '';
  key: string;
  sib: Stove[];
  dib: Stove[];
  tib: Stove[];
  fib: Stove[];
  sib2: Stove[];
  dib2: Stove[];
  tib2: Stove[];
  fib2: Stove[];
  
  
  constructor(
    public navParams: NavParams,
    private productService: ProductService,
    private navCtrl: NavController
  ) {
    
  }

  ngOnInit () {
    this.company = this.navParams.get('company');
    this.type = this.navParams.get('type');
    //console.log(this.company,this.type);
  }
  ionViewWillEnter() {
     this.productService.getAll(this.company,this.type,'Single').subscribe(products => {
      this.sib = products;
      this.sib2 = products;
      console.log(this.sib);
     });

     this.productService.getAll(this.company,this.type,'Double').subscribe(products => {
      this.dib = products;
      this.dib2 = products;
      console.log(this.dib);
     });

     this.productService.getAll(this.company,this.type,'Triple').subscribe(products => {
      this.tib = products;
      this.tib2 = products;
      console.log(this.tib);
     });

     this.productService.getAll(this.company,this.type,'Four').subscribe(products => {
      this.fib = products;
      this.fib2 = products;
      console.log(this.fib);
     });
      


  }
  onEdit(id: number, price: string, image: string, subtype: string, key: string) {
    this.navCtrl.push(EditProductPage,{
      id:id,
      price: price,
      company: this.company,
      type: this.type,
      subtype: subtype,
      image: image,
      mode: 'Edit',
      key: key
    })
  }
  initializeItems() {
    this.sib = this.sib2;
    this.dib = this.dib2;
    this.tib = this.tib2;
    this.fib = this.fib2;
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.sib = this.sib.filter((item) => {
        return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.dib = this.dib.filter((item) => {
        return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.tib = this.tib.filter((item) => {
        return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.fib = this.fib.filter((item) => {
        return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
}
}