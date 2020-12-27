import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.scss'],
})
export class AppointmentPageComponent implements OnInit {
  appointment: string = "coming";
  isAndroid: boolean = false;
  constructor() { }

  ngOnInit() {}

}
