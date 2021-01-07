import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, LoadingComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    CommonModule, IonicModule, FormsModule, HeaderComponent, LoadingComponent
  ]
})
export class SharedModule { }
