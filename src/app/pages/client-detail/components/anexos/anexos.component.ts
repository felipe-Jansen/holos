import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss'],
})
export class AnexosComponent implements OnInit {
  @Input() anexos: any;
  constructor() { }

  ngOnInit() {
    console.log(this.anexos)
  }

}
