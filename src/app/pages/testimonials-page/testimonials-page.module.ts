import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsPageComponent } from './testimonials-page.component'
import { RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared.module';

const routes = [
  {
    path: '',
    component: TestimonialsPageComponent
  }
]


@NgModule({
  declarations: [TestimonialsPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TestimonialsPageModule { }
