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
import { BookApointmentService } from "./providers/book-apointment.service";
import localePtBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localePtBr);
import { Camera } from "@ionic-native/Camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TransferState } from "@angular/platform-browser";
import { AuthInterceptor } from "./providers/auth/auth-interceptor";


import { AppComponent } from "./app.component";
import { Principal } from "./providers/auth/principal.service";
import { AccountService } from "./providers/auth/account.service";
import { AuthServerProvider } from "./providers/auth/auth-jwt.service";
import { LoginService } from "./providers/login/login.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Api } from "./providers/api/api";



@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: "md",
    }),
    AppRoutingModule,
    HttpClientModule,
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
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TransferState,
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
