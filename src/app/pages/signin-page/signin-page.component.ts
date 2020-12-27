import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"],
})
export class SigninPageComponent implements OnInit {
  sign: string = "signin";
  isAndroid: boolean = false;

  constructor() {}

  ngOnInit() {}
}
