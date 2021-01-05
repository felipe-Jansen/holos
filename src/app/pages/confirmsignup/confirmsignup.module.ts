import { NgModule } from '@angular/core';
import { ConfirmsignupComponent } from './confirmsignup.component'
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shared/shell/shell.module';

const routes = [
  {
    path: '',
    component: ConfirmsignupComponent
  }
]


@NgModule({
  declarations: [ConfirmsignupComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SimpleMaskModule,
    ReactiveFormsModule,
    ShellModule
  ]
})
export class ConfirmsignupModule { }
