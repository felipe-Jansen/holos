import { NgModule } from '@angular/core';
import { BlogdocPageComponent } from './blogdoc-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../../pipes/pipes.module'

const routes = [
  {
    path: '',
    component: BlogdocPageComponent
  }
]


@NgModule({
  declarations: [BlogdocPageComponent],
  imports: [
    RouterModule.forChild(routes), SharedModule, HttpClientModule, PipesModule
  ]
})
export class BlogdocPageModule { }
