import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const APPID = '2b9339c9-de11-42a9-ba23-86237fdd385f'
const IDSENDER = '848309288612'
const RESTAPI = 'ZWYzZTAwNDMtMmNmYi00NjFiLTk0M2EtMjkzZDg2Y2QyNWMz'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getNotificationSubject(): Subject<any> {
    return this.notificationSubject;
  }

  getAllNotifications(): any {
    const httpOptions = new HttpHeaders({
      'Authorization': `Basic ${RESTAPI}`,
      'Content-Type': 'application/json; charset=utf-8'
    })
    return this.http.get(`https://onesignal.com/api/v1/notifications?app_id=${APPID}&offset=0`, {
      headers: httpOptions
    })
  }

  addNotification(notification: any): void {
    console.log(notification)
    this.notificationSubject.next(notification)
  }
}
