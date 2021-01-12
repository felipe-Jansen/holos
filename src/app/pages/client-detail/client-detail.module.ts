import { NgModule } from '@angular/core';
import { ClientDetailComponent } from './client-detail.component'
import { ClientDetailResolver } from './client-detail.resolver'
import { AgendamentoCardComponent } from './components/agendamento-card/agendamento-card.component'
import { AgendamentoComponent } from './components/agendamento/agendamento.component'
import { AnexosComponent } from './components/anexos/anexos.component'
import { DetailModalComponent } from './components/detail-modal/detail-modal.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shared/shell/shell.module';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { PipesModule } from 'src/app/pipes/pipes.module';


const routes = [
  {
    path: '',
    component: ClientDetailComponent,
    resolve: {
      data: ClientDetailResolver
    }
  }
]


@NgModule({
  declarations: [
    ClientDetailComponent,
    AgendamentoCardComponent,
    AgendamentoComponent,
    AnexosComponent,
    DetailModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    ShellModule,
    SimpleMaskModule,
    PipesModule
  ],
  providers: [
    ClientDetailResolver,
    Camera,
    File,
    FileTransfer,
    FileOpener,
    PhotoViewer,
  ]
})
export class ClientDetailModule { }
