import { NgModule } from '@angular/core';
import { SigninPageComponent } from './signin-page.component'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: SigninPageComponent
  }
]


@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class SigninPageModule { }
