import { NgModule } from '@angular/core';
import { ClientPageComponent } from './client-page.component'
import { RouterModule } from '@angular/router';
import { ShellModule } from 'src/app/shared/shell/shell.module';
import { SharedModule } from 'src/app/shared.module';

const routes = [
  {
    path: '',
    component: ClientPageComponent
  }
]


@NgModule({
  declarations: [ClientPageComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ShellModule
  ]
})
export class ClientPageModule { }
