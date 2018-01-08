import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { OrderService } from './../../service/order.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage implements OnInit {
  private toast;
  private allOrders;
  
  constructor(private orderService:OrderService,private toastCtrl: ToastController) {
  }
  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.allOrders = orders;
      console.log(this.allOrders);
    })
  }
deleteOrder(key) {
  
  this.orderService.deleteOrder(key).then(() => {
    this.presentToast();
  })
}
presentToast() {
  this.toast = this.toastCtrl.create({
    message: 'Order was deleted successfully ',
    duration: 3000,
    position: 'bottom'
  });
  this.toast.present();
}

}
