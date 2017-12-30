import { EditProductPage } from './../edit-product/edit-product';
import { ProductService } from './../../service/product.service';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Product } from '../../models/product.model';


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage  implements OnInit {
  type: string;
  company: string;
  searchQuery: string = '';
  allProducts: Product[];
  filteredProducts:Product[];
  companyProducts: Product[];
  
  constructor(
    public navParams: NavParams,
    private productService: ProductService,
    private navCtrl: NavController
  ) {
    
  }

  ngOnInit () {
    this.company = this.navParams.get('company');
    this.type = this.navParams.get('type');
  }

  ionViewWillEnter() {
      
    this.productService.getByCompany(this.company).subscribe(products => {
    this.allProducts = products;
  
    this.companyProducts = this.allProducts.filter(p => p.type === this.type);
    this.filteredProducts = this.companyProducts; 
  })

  }
  
  onEdit(key: string) {
    this.navCtrl.push(EditProductPage,{
      mode: 'Edit',
      key: key
    })
  }

  filter(ev: any) {

    let val = ev.target.value;
    this.filteredProducts = (val) ?
      this.companyProducts.filter(p => p.id.toLowerCase().includes(val.toLowerCase())) :
      this.companyProducts;
}
}