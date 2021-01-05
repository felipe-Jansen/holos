import { NgModule } from '@angular/core';
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { GalleryPageComponent } from './gallery-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';


const routes = [
  {
    path: '',
    component: GalleryPageComponent
  }
]

@NgModule({
  declarations: [GalleryPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PhotoViewer
  ]
})
export class GalleryPageModule { }
