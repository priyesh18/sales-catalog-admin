import { NavController } from 'ionic-angular/navigation/nav-controller';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './../../service/product.service';
import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit{
  mode='New';
  data:Product;
  key: string;
  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private navParams:NavParams) {
    
  }
  imagerl="";
  onAddProduct(form: NgForm) {
    
    console.log(form.value);
    this.productService.onAdd(
      form.value.id,
      form.value.company,
      form.value.type,
      form.value.subtype,
      form.value.price,
      form.value.imageUrl
    ).subscribe(
      () => console.log('success'),
      error => {
        console.log(error);
      }
    )
    this.imagerl=form.value.imageUrl;
    
  }
  onDeleteProduct() {
    this.productService.onDelete(this.data.company,this.data.type, this.data.subtype,this.key)
    .subscribe(
      () => console.log('success'),
      error => {
        console.log(error);
      }
    );
    this.navCtrl.pop();
  }
  onEditProduct(form:NgForm) {
    //console.log(form.value);
    this.productService.onEdit(
      form.value.id,
      form.value.company,
      form.value.type,
      form.value.subtype,
      form.value.price,
      form.value.imageUrl,
      this.key
    ).subscribe(
      () => console.log('success'),
      error => {
        console.log(error);
      }
    )
    this.imagerl=form.value.imageUrl;
  }
  ngOnInit () {
    this.mode=this.navParams.get('mode');
    this.key = this.navParams.get('key');
    console.log(this.key);
    this.data = new Product(
      this.navParams.get('id'),
      this.navParams.get('company'),
      
      this.navParams.get('type'),
      this.navParams.get('subtype'),
      this.navParams.get('price'),
      this.navParams.get('image')
    )
    console.log(this.data);

  }
}
