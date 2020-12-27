import { Component, OnInit, Output } from "@angular/core";
import { BookApointmentService } from "../../shared/services/book-apointment.service";

@Component({
  selector: "app-confirm-apointment-page",
  templateUrl: "./confirm-apointment-page.component.html",
  styleUrls: ["./confirm-apointment-page.component.scss"],
})
export class ConfirmApointmentPageComponent implements OnInit {
  choosedTypeApointment: string;
  otherProblem: string;

  constructor(private bookApointmentService: BookApointmentService) {}

  ngOnInit() {
    console.log(this.bookApointmentService.getClient());
  }

  setTypeApointment(type: string): void {
    console.log(type);
    this.choosedTypeApointment = type;
    this.bookApointmentService.setAppointmentType(type);
  }

  sendWhatsapp() {
    if(this.otherProblem){
      this.bookApointmentService.setAppointmentType(this.otherProblem)
    }
    this.bookApointmentService.sendMessageWhatsapp();
  }
}
