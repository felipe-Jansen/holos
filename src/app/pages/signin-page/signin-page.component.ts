import { Router } from '@angular/router';

import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/providers/login/login.service";

@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"],
})
export class SigninPageComponent implements OnInit {
  sign: string = "signin";
  isAndroid: boolean = false;

  login : string;
  senha: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  logar():void {
      this.loginService.login({ username: this.login, password: this.senha , rememberMe: true})
      .then( token => {
          this.router.navigate(['/home'])
          console.log(token)
      })
      .catch(err => {
        console.log("Erro no login",err)
      })
      
  }
}
