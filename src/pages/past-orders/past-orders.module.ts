import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastOrdersPage } from './past-orders';

@NgModule({
  declarations: [
    PastOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(PastOrdersPage),
  ],
})
export class PastOrdersPageModule {}
