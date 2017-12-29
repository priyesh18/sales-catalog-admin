import { NavController } from 'ionic-angular/navigation/nav-controller';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './../../service/product.service';
import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit{
  mode='New';
  data:Product;
  key: string;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private camera: Camera,
    private navParams:NavParams) {
      this.myPhotosRef = firebase.storage().ref('/Photos/');
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
      this.data.imageUrl
    ).subscribe(
      () => {
        this.productService.create(new Product(
          form.value.id,
      form.value.company,
      form.value.type,
      form.value.subtype,
      form.value.price,
      this.data.imageUrl
        ))
      },
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
   // this.imagerl=form.value.imageUrl;
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
    //console.log(this.data);

  }


  takePhoto() {
    const options:CameraOptions = {
      quality: 50,
      targetHeight: 400,
      correctOrientation: true,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.myPhoto = imageData;
        this.uploadPhoto();
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
  }
 
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
 
  private uploadPhoto(): void {
    this.myPhotosRef
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        this.data.imageUrl = savedPicture.downloadURL;
      });
  }
 
  // private generateUUID(): any {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }
}
