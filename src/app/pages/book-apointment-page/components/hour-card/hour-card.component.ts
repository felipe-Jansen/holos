import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hour-card',
  templateUrl: './hour-card.component.html',
  styleUrls: ['./hour-card.component.scss'],
})
export class HourCardComponent implements OnInit {
  @Input() hour: string;
  @Input() selectedHour: string;
  @Output() hourEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}


  chooseHour(event: any){
    console.log(event)
    this.hourEmitter.emit(this.hour)
  }
}
