import { NgModule } from '@angular/core';
import { ConfirmApointmentPageComponent } from './confirm-apointment-page.component'
import { ConfirmCardComponent } from './components/confirm-card/confirm-card.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: ConfirmApointmentPageComponent
  }
]


@NgModule({
  declarations: [ConfirmApointmentPageComponent, ConfirmCardComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ConfirmApointmentPageModule { }
