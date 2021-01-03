import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../providers/notification.service'

interface Notification {
  body: string;
  groupMessage?: string;
  rawPayload?: string;
  title: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})

export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  notificationSubscriber: Subscription;

  constructor(private notificationService: NotificationService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.notificationSubscriber = this.notificationService.getNotificationSubject()
      .subscribe(notification => {
        console.log(notification)
        const { body, title } = notification.payload
        this.notifications = [...this.notifications, { body, title }]
        // por algum motivo a view não estava sendo atualizada, por isso forcei a detecção de mudança
        this.ref.detectChanges()
        console.log(this.notifications)
      })

    /*
    this.notificationService.getAllNotifications().subscribe(data => {
      console.log(data)
    })
  */
  }

  ngOnDestroy() {
    this.notificationSubscriber.unsubscribe()
  }

}
