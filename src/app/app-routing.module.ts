import { AuthGuard } from './providers/guard/auth.guard';
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "sign",
    loadChildren: () => import('./pages/signin-page/signin-page.module')
      .then(m => m.SigninPageModule)
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
  {
    path: "about",
    loadChildren: () => import("./pages/about-page/about-page.module")
      .then(m => m.AboutPageModule),
  },
  {
    path: "appointment",
    loadChildren: () => import("./pages/appointment-page/appointment-page.module")
      .then(m => m.AppointmentPageModule)
  },
  {
    path: "services",
    loadChildren: () => import("./pages/services-page/services-page.module")
      .then(m => m.ServicesPageModule)
  },
  {
    path: "testimonials",
    loadChildren: () => import("./pages/testimonials-page/testimonials-page.module")
      .then(m => m.TestimonialsPageModule)
  },
  {
    path: "gallery",
    loadChildren: () => import("./pages/gallery-page/gallery-page.module")
      .then(m => m.GalleryPageModule)
  },
  {
    path: "availability",
    loadChildren: () => import("./pages/availability-page/availability-page.module")
      .then(m => m.AvailabilityPageModule)
  },
  {
    path: "bookappointment",
    loadChildren: () => import("./pages/book-apointment-page/book-apointment-page.module")
      .then(m => m.BookApointmentPageModule)
  },
  {
    path: "confirmappointment",
    loadChildren: () => import("./pages/confirm-apointment-page/confirm-apointment-page.module")
      .then(m => m.ConfirmApointmentPageModule)

  },
  {
    path: "reachus",
    loadChildren: () => import("./pages/reach-page/reach-page.module")
      .then(m => m.ReachPageModule)
  },
  {
    path: "blog",
    loadChildren: () => import("./pages/blogdoc-page/blogdoc-page.module")
      .then(m => m.BlogdocPageModule)

  },
  {
    path: "blogdetail",
    loadChildren: () => import("./pages/blog-page/blog-page.module")
      .then(m => m.BlogPageModule)
  },
  {
    path: "contact",
    loadChildren: () => import("./pages/contact-page/contact-page.module")
      .then(m => m.ContactPageModule)
  },
  {
    path: "client",
    loadChildren: () => import("./pages/client-page/client-page.module")
      .then(m => m.ClientPageModule)
  },
  {
    path: "client-detail/:id",
    loadChildren: () => import("./pages/client-detail/client-detail.module")
      .then(m => m.ClientDetailModule)

  },
  {
    path: "notifications",
    loadChildren: () => import("./pages/notifications/notifications.module")
      .then(m => m.NotificationsModule)

  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
