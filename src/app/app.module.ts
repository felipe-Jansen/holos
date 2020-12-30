import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";


import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { File } from "@ionic-native/file/ngx";
import { BookApointmentService } from "./shared/services/book-apointment.service";
import localePtBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localePtBr);
import { Camera } from "@ionic-native/Camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx'



import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PipesModule } from "./pipes/pipes.module";
import { ComponentsModule } from "./shared/components/components.module";
import { TransferState } from "@angular/platform-browser";
import { ClientDetailResolver } from "./pages/client-detail/client-detail.resolver";
import { AuthInterceptor } from "./providers/auth/auth-interceptor";

import { AppComponent } from "./app.component";
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
import { BlogdocPageComponent } from "./pages/blogdoc-page/blogdoc-page.component";
import { BlogPageComponent } from "./pages/blog-page/blog-page.component";
import { AppointmentPageComponent } from "./pages/appointment-page/appointment-page.component";
import { HeaderComponent } from "./pages/header/header.component";
import { DayComponent } from "./pages/book-apointment-page/components/day/day.component";
import { HoursComponent } from "./pages/book-apointment-page/components/hours/hours.component";
import { HourCardComponent } from "./pages/book-apointment-page/components/hour-card/hour-card.component";
import { ApointmentFormComponent } from "./pages/book-apointment-page/components/apointment-form/apointment-form.component";
import { ConfirmCardComponent } from "./pages/confirm-apointment-page/components/confirm-card/confirm-card.component";
import { ClientPageComponent } from "./pages/client-page/client-page.component";
import { ClientDetailComponent } from "./pages/client-detail/client-detail.component";
import { DetailModalComponent } from "./pages/client-detail/components/detail-modal/detail-modal.component";
import { ClientService } from "./pages/client-page/client.service";
import { AgendamentoComponent } from "./pages/client-detail/components/agendamento/agendamento.component";
import { AnexosComponent } from "./pages/client-detail/components/anexos/anexos.component";
import { Principal } from "./providers/auth/principal.service";
import { AccountService } from "./providers/auth/account.service";
import { AuthServerProvider } from "./providers/auth/auth-jwt.service";
import { LoginService } from "./providers/login/login.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Api } from "./providers/api/api";
import { AgendamentoCardComponent } from "./pages/client-detail/components/agendamento-card/agendamento-card.component";

@NgModule({
  declarations: [
    AppComponent,
    SigninPageComponent,
    HomePageComponent,
    ServicesPageComponent,
    TestimonialsPageComponent,
    GalleryPageComponent,
    AvailabilityPageComponent,
    BookApointmentPageComponent,
    ConfirmApointmentPageComponent,
    ReachPageComponent,
    ContactPageComponent,
    BlogPageComponent,
    BlogdocPageComponent,
    AppointmentPageComponent,
    HeaderComponent,
    DayComponent,
    HoursComponent,
    HourCardComponent,
    ApointmentFormComponent,
    ConfirmCardComponent,
    ClientPageComponent,
    ClientDetailComponent,
    DetailModalComponent,
    AgendamentoComponent,
    AnexosComponent,
    AgendamentoCardComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: "md",
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    InAppBrowser,
    BookApointmentService,
    File,
    FilePath,
    Camera,
    FileTransfer,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TransferState,
    ClientService,
    ClientDetailResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "pt-BR" },
    Principal,
    AccountService,
    AuthServerProvider,
    LoginService,
    LocalStorageService,
    SessionStorageService,
    Api,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
