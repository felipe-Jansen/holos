import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsPageComponent } from './testimonials-page.component'
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: TestimonialsPageComponent
  }
]


@NgModule({
  declarations: [TestimonialsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TestimonialsPageModule { }
