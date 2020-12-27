import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"],
})
export class HoursComponent implements OnInit {
  @Output() choosedHourEmitter = new EventEmitter<string>();
  actualHour: string;

  constructor() {}

  ngOnInit() {}

  receiveHour(hour: string): void {
    this.actualHour = hour;
    this.choosedHourEmitter.emit(hour);
  }
  
}
