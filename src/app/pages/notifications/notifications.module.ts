import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component'
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import { ShellModule } from 'src/app/shared/shell/shell.module';

const routes = [
  {
    path: '',
    component: NotificationsComponent
  }
]

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes), ShellModule
  ]
})
export class NotificationsModule { }
