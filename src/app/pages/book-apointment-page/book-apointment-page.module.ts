import { NgModule } from '@angular/core';
import { BookApointmentPageComponent } from './book-apointment-page.component'
import { ApointmentFormComponent } from './components/apointment-form/apointment-form.component'
import { DayComponent } from './components/day/day.component'
import { HourCardComponent } from './components/hour-card/hour-card.component'
import { HoursComponent } from './components/hours/hours.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: BookApointmentPageComponent
  }
]

@NgModule({
  declarations: [
    BookApointmentPageComponent,
    ApointmentFormComponent,
    DayComponent,
    HourCardComponent,
    HoursComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class BookApointmentPageModule { }
