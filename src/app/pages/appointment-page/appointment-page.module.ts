import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppointmentPageComponent } from "./appointment-page.component";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared.module";

const routes = [
  {
    path: "",
    component: AppointmentPageComponent,
  },
];

@NgModule({
  declarations: [AppointmentPageComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AppointmentPageModule { }
