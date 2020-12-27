import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SigninPageComponent } from "./pages/signin-page/signin-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { ServicesPageComponent } from "./pages/services-page/services-page.component";
import { TestimonialsPageComponent } from "./pages/testimonials-page/testimonials-page.component";
import { GalleryPageComponent } from "./pages/gallery-page/gallery-page.component";
import { AvailabilityPageComponent } from "./pages/availability-page/availability-page.component";
import { BookApointmentPageComponent } from "./pages/book-apointment-page/book-apointment-page.component";
import { ConfirmApointmentPageComponent } from "./pages/confirm-apointment-page/confirm-apointment-page.component";
import { ReachPageComponent } from "./pages/reach-page/reach-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { BlogPageComponent } from "./pages/blog-page/blog-page.component";
import { BlogdocPageComponent } from "./pages/blogdoc-page/blogdoc-page.component";
import { AppointmentPageComponent } from "./pages/appointment-page/appointment-page.component";
import { ClientPageComponent } from "./pages/client-page/client-page.component";
import { ClientDetailComponent } from "./pages/client-detail/client-detail.component";
import { ClientDetailResolver } from "./pages/client-detail/client-detail.resolver";

const routes: Routes = [
  {
    path: "sign",
    component: SigninPageComponent,
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "appointment",
    component: AppointmentPageComponent,
  },
  {
    path: "services",
    component: ServicesPageComponent,
  },
  {
    path: "testimonials",
    component: TestimonialsPageComponent,
  },
  {
    path: "gallery",
    component: GalleryPageComponent,
  },
  {
    path: "availability",
    component: AvailabilityPageComponent,
  },
  {
    path: "bookappointment",
    component: BookApointmentPageComponent,
  },
  {
    path: "confirmappointment",
    component: ConfirmApointmentPageComponent,
  },
  {
    path: "reachus",
    component: ReachPageComponent,
  },
  {
    path: "blog",
    component: BlogdocPageComponent,
  },
  {
    path: "blogdetail",
    component: BlogPageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
  },
  {
    path: "client",
    component: ClientPageComponent,
  },
  {
    path: "client-detail/:id",
    component: ClientDetailComponent,
    resolve: {
      data: ClientDetailResolver,
    },
  },
  {
    path: "",
    redirectTo: "sign",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
