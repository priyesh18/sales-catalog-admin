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
doneOrder(order) {
  
  this.orderService.doneOrder(order).then(() => {
    this.presentToast("completed");
    this.deleteOrder(order.$key);
    console.log(order.$key);
  })
}
deleteOrder(key) {
  
  this.orderService.deleteOrder(key).then(() => {
    this.presentToast("deleted");
  })
}
presentToast(msg) {
  this.toast = this.toastCtrl.create({
    message: "Order was "+msg+" successfully",
    duration: 3000,
    position: 'bottom'
  });
  this.toast.present();
}

}
