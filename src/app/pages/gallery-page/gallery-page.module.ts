import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { GalleryPageComponent } from './gallery-page.component'
import { RouterModule } from '@angular/router';


const routes = [
  {
    path: '',
    component: GalleryPageComponent
  }
]

@NgModule({
  declarations: [GalleryPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PhotoViewer
  ]
})
export class GalleryPageModule { }
