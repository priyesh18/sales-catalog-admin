import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IonicPage, ToastController } from 'ionic-angular';

import { OrderService } from '../../service/order.service';

/**
 * Generated class for the PastOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past-orders',
  templateUrl: 'past-orders.html',
})
export class PastOrdersPage implements OnInit {

  private toast;
  private allOrders;
  
  constructor(private orderService:OrderService,private toastCtrl: ToastController) {
  }
  ngOnInit() {
    this.orderService.getPastOrders().subscribe(orders => {
      this.allOrders = orders;
      
    })
  }

deleteOrder(key) {
  
  this.orderService.deletePastOrder(key).then(() => {
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
