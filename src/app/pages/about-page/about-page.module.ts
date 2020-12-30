import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutPageComponent } from "./about-page.component";
import { RouterModule } from "@angular/router";

const routes = [{ path: "", component: AboutPageComponent }];

@NgModule({
  declarations: [AboutPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AboutPageModule {}
