import { NgModule } from "@angular/core";
import { AboutPageComponent } from "./about-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared.module"

const routes = [{ path: "", component: AboutPageComponent }];

@NgModule({
  declarations: [AboutPageComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AboutPageModule {}
