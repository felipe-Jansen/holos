import { Router } from '@angular/router';
import { Cadastro } from '../../interfaces/cadastroInterface'
import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "src/app/providers/login/login.service";
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastraService } from '../../providers/cadastra.service';

interface Login {
  login: string;
  senha: string;
}


@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"],
})
export class SigninPageComponent implements OnInit, OnDestroy {
  sign: string = "signin";
  isAndroid: boolean = false;

  login: Login = {
    login: '',
    senha: ''
  }
  validations = {
    'nome': [
      { type: 'required', message: 'Nome é obrigatório!' },
    ],
    'senha': [
      { type: 'required', message: 'Senha é obrigatória!' },
    ],
    'email': [
      { type: 'pattern', message: 'Entre um e-mail válido.' },
      { type: 'required', message: 'O e-mail é obrigatório!' }
    ],
    'login': [
      { type: 'required', message: 'Login é obrigatório!' }
    ],
  };

  cadastroForm: FormGroup;

  constructor(private loginService: LoginService,
    private router: Router,
    private toastController: ToastController,
    private cadastraService: CadastraService,
    private route: Router) { }

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    })
  }


  ngOnDestroy() {
    console.log("Fui destruido!")
  }
  get nomeCadastro() { return this.cadastroForm.get('nome') }
  get loginCadastro() { return this.cadastroForm.get('login') }
  get emailCadastro() { return this.cadastroForm.get('email') }
  get senhaCadastro() { return this.cadastroForm.get('senha') }

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
    const {
      nome,
      login,
      email,
      senha
    } = this.cadastroForm.value
    let cadastro: Cadastro = {
      firstName: nome,
      email,
      login,
      password: senha,
      authorities: [
        "ROLE_USER",
      ],
      activated: true,
      lastName: '',
      langKey: 'pt-br',
      imageUrl: null
    }
    this.cadastraService.setCadastro(cadastro)
    this.route.navigate(['/confirmsignup'])
  }

}
