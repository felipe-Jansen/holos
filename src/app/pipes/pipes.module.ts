import { NgModule } from "@angular/core";
import { NewsPipe } from "./news/news.pipe";
import { ClientPropsPipe } from './client-props.pipe';
@NgModule({
  declarations: [NewsPipe, ClientPropsPipe],
  imports: [],
  exports: [NewsPipe, ClientPropsPipe],
})
export class PipesModule { }
