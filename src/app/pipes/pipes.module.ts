import { NgModule } from "@angular/core";
import { NewsPipe } from "./news/news.pipe";
@NgModule({
  declarations: [NewsPipe],
  imports: [],
  exports: [NewsPipe],
})
export class PipesModule {}
