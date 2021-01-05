import { NgModule } from '@angular/core';
import { ReachPageComponent } from './reach-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: ReachPageComponent
  }
]


@NgModule({
  declarations: [ReachPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReachPageModule { }
