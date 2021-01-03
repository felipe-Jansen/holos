import { Router } from '@angular/router';

import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/providers/login/login.service";
import { ToastController } from '@ionic/angular';

interface Login {
  login: string;
  senha: string;
}

interface Cadastro {
  login: string;
  firstName: string;
  lastName?: string;
  email: string;
  imageUrl?: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  authorities: [string]
}

@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"],
})
export class SigninPageComponent implements OnInit {
  sign: string = "signin";
  isAndroid: boolean = false;

  login: Login = {
    login: '',
    senha: ''
  }

  whatsappCadastro: string;
  nomeCadastro: string;
  senhaCadastro: string;

  constructor(private loginService: LoginService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  logar(): void {
    const { login, senha } = this.login
    this.loginService.login({ username: login, password: senha, rememberMe: true })
      .then(token => {
        this.router.navigate(['/home'])
        console.log(token)
      })
      .catch(err => {
        let message = ''
        if (err.status === 401) {
          message = "Login ou senha incorretos!"
        } else message = "Falha no login. Por favor tente novamente."
        this.presentToast(message)
        console.log("Erro no login", err)
      })

  }


  cadastrar(): void {
  }
}
