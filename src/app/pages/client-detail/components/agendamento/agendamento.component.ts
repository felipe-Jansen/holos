import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  @Input() agendamento: any;
  constructor() { }

  ngOnInit() {
    console.log(this.agendamento)
  }

}
