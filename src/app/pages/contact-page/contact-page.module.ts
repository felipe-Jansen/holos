import { NgModule } from '@angular/core';
import { ContactPageComponent } from './contact-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: ContactPageComponent
  }
]

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactPageModule { }
