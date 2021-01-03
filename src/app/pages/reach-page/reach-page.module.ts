import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReachPageComponent } from './reach-page.component'
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ReachPageComponent
  }
]


@NgModule({
  declarations: [ReachPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReachPageModule { }
