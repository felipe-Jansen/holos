import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppConfig, APP_CONFIG } from './app.config';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { NotificationService } from './providers/notification.service';

const APPID = '2b9339c9-de11-42a9-ba23-86237fdd385f'
const IDSENDER = '848309288612'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private notificationService: NotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('oi')
      if (this.platform.is('cordova')) {
        this.setupNotification()
      }

    });
  }

  setupNotification() {
    this.oneSignal.startInit(APPID, IDSENDER)
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      this.notificationService.addNotification(data)
    })

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      console.log(data)
    });

    this.oneSignal.endInit();
  }
}
