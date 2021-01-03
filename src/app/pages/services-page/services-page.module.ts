import { NgModule } from '@angular/core';
import { ServicesPageComponent } from './services-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: ServicesPageComponent
  }
]


@NgModule({
  declarations: [ServicesPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ServicesPageModule { }
