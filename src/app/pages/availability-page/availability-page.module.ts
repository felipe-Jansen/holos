import { NgModule } from '@angular/core';
import { AvailabilityPageComponent } from './availability-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: AvailabilityPageComponent
  }
]

@NgModule({
  declarations: [AvailabilityPageComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class AvailabilityPageModule { }
