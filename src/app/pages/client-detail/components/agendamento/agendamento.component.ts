import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/pages/client-page/client.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  @Input() idPatient: any;
  agendamento: any;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    console.log(this.idPatient)
    this.clientService.getAgenda(this.idPatient).subscribe(data => {
      console.log(data)
      this.agendamento = data;
    })
  }

}
