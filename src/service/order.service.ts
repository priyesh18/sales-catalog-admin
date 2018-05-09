import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
@Injectable()
export class OrderService {
    constructor(private db: AngularFireDatabase) {}
    getOrders() {
        return this.db.list('/orders/');
    }
    deleteOrder(key) {
        return this.db.object('/orders/' + key).remove();
    }
    doneOrder(order) {
        return this.db.list('/pastOrders').push(order);
    }
    getPastOrders() {
        return this.db.list('/pastOrders/');
    }
}