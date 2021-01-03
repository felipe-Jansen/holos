import { Component, OnInit } from "@angular/core";
import { BookApointmentService } from "../../providers/book-apointment.service";

@Component({
  selector: "app-book-apointment-page",
  templateUrl: "./book-apointment-page.component.html",
  styleUrls: ["./book-apointment-page.component.scss"],
})
export class BookApointmentPageComponent implements OnInit {
  choosedHour: string;
  choosedDay: number;
  nameClient: string;
  phoneClient: string;

  constructor(private bookApointmentService: BookApointmentService) {}

  ngOnInit() {}

  receiveHour(event: any): void {
    console.log("hora", event);
    this.choosedHour = event;
  }

  receiveDay(event: any): void {
    console.log("Dia", event);
    this.choosedDay = event;
  }

  receiveFormData(event: any) {
    const { name, phone } = event;
    this.nameClient = name;
    this.phoneClient = phone;
    this.bookApointmentService.setClient({
      name,
      phone,
      hour: this.choosedHour,
      day: this.choosedDay,
    });
  }
}
