import { ChartsPage } from './../charts/charts';
import { ProductListPage } from './../product-list/product-list';
import { Component } from '@angular/core';
import { OrderListPage } from '../order-list/order-list';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  private productList = ProductListPage;
  private orderList = OrderListPage;
  private charts = ChartsPage;
}
