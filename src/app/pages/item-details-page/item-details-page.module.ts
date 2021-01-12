import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailsPageComponent } from './item-details-page.component'
import { RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';

const routes = [
  {
    path: '',
    component: ItemDetailsPageComponent
  }
]

@NgModule({
  declarations: [ItemDetailsPageComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class ItemDetailsPageModule { }
