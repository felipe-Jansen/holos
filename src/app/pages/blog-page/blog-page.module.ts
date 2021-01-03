import { NgModule } from '@angular/core';
import { BlogPageComponent } from './blog-page.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { PipesModule } from '../../pipes/pipes.module'

const routes = [
  {
    path: '',
    component: BlogPageComponent
  }
]

@NgModule({
  declarations: [BlogPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PipesModule
  ]
})
export class BlogPageModule { }
