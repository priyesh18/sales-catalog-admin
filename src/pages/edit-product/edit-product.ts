import { CategoryService } from './../../service/category.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './../../service/product.service';
import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
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
  categories$;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any = "";
  public imageRef: string = "";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private navCtrl: NavController,
    private camera: Camera,
    private navParams:NavParams) {
      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }

  ngOnInit () {
    this.mode=this.navParams.get('mode');
    this.key = this.navParams.get('key');
    this.categories$ = this.categoryService.getAll();
   
    this.productService.get(this.key).subscribe(product => {
      this.data = product;
      this.imageRef = this.data.image;
    })
  }

  onAddProduct(product) {
    product["image"] = this.myPhotoURL;
    product["search"] = product.id+product.company+product.type+product.subtype+product.description;
   // console.log(product);
   const promise = this.productService.create(product);
   promise.then(_ => console.log('success'))
   .catch(err => console.log(err, 'You do not have access!'));
 
  }
  onDeleteProduct() {
    this.deletePhoto();
    const promise = this.productService.delete(this.key);
   promise.then(_ => console.log('success'))
   .catch(err => console.log(err, 'You do not have access!'));
    
    this.navCtrl.pop();
  }

  onEditProduct(product) {
    this.deletePhoto();
    product["image"] = this.myPhotoURL;
    product["search"] = product.id+product.company+product.type+product.subtype+product.description;
   // console.log(product);
   const promise = this.productService.update(this.key,product);
   promise.then(_ => console.log('success'))
   .catch(err => console.log(err, 'You do not have access!'));

  }

  takePhoto() {
    const options:CameraOptions = {
      quality: 70,
      targetHeight: 400,
      correctOrientation: true,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG
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
      quality: 70,
      targetHeight: 400,
      correctOrientation: true,
      targetWidth: 600,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private deletePhoto() {
    // Create a reference to the file to delete
    console.log(this.imageRef);
    let name = this.imageRef.substr(this.imageRef.indexOf('%2F') + 3,
     (this.imageRef.indexOf('?')) - (this.imageRef.indexOf('%2F') + 3));
     console.log(name);

    this.myPhotosRef.child(name)
    .delete().then(function() {
    }).catch(function(error) {
    });
  }
 
  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID())
      .putString(this.myPhoto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        this.data.image = savedPicture.downloadURL;
      });
  }
  
  private generateUUID(): any {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
 
}
