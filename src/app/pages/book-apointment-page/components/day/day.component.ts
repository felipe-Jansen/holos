import { Component, EventEmitter, OnInit, Output } from "@angular/core";

const MES = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

const DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.scss"],
})
export class DayComponent implements OnInit {
  mes: number;
  ano: number;
  dias = [];
  diasMostrados = 5;

  @Output() choosedDayEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    let dataAtual = new Date();
    let diaNumero = dataAtual.getDate();
    this.ano = dataAtual.getFullYear()
    this.mes = dataAtual.getMonth();
    for (let i = 0; i < this.diasMostrados; i++) {
      this.dias.push({
        diaSemana: this.numberToDay(
          new Date(2020, this.mes, diaNumero).getDay()
        ),
        diaMes: diaNumero,
      });
      diaNumero++;
    }
  }

  chooseDay(event: any) {
    let dayValue = Number(event.detail.value)
    this.choosedDayEmitter.emit({
      dia: dayValue,
      mes: this.mes,
      ano: this.ano
    })
  }

  numberToDay(dayNumber: number): string {
    return DIAS[dayNumber];
  }

  numberToMonth(monthNumber: number): string {
    return MES[monthNumber];
  }
}
