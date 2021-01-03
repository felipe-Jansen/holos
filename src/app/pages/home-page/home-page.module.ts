import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { AuthGuard } from 'src/app/providers/guard/auth.guard';

const routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthGuard
  ]
})
export class HomePageModule { }
