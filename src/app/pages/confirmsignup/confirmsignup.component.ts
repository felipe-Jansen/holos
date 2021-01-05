import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cadastro } from '../../interfaces/cadastroInterface'
import { CadastraService } from '../../providers/cadastra.service'
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { ClientService } from 'src/app/providers/client.service';
import { LoginService } from 'src/app/providers/login/login.service';
import { Router } from '@angular/router';
import { Principal } from 'src/app/providers/auth/principal.service';


@Component({
  selector: 'app-confirmsignup',
  templateUrl: './confirmsignup.component.html',
  styleUrls: ['./confirmsignup.component.scss'],
})
export class ConfirmsignupComponent implements OnInit {
  cadastroAtual: Cadastro;
  userForm: FormGroup;

  selectedAvatar: string;
  meses = "JAN,FEV,MAR,ABR,MAI,JUN,JUL,AGO,SET,OUT,NOV,DEZ";
  generos = ["Masculino", "Feminino", "Outros"]
  captacaoOpcoes = ["FACEBOOK", "INSTAGRAM", "REVISTA", "INDICAÇÃO"]

  validations = {
    'cpf': [
      {
        type: 'minlength', message: 'Cpf deve ter no mínimo 11 caracteres!',

      },
      {
        type: 'required', message: 'Cpf é obrigatório!',
      },
    ],
    'whatsapp': [
      { type: 'minlength', message: 'Whatsapp tem no mínimo 11 dígitos!.' },
      { type: 'required', message: 'O Whatsapp é obrigatório!' }
    ],
    'cidade': [
      { type: 'required', message: 'A cidade é obrigatória!' }
    ],
    'bairro': [
      { type: 'required', message: 'O Bairro é obrigatório!' }
    ],
    'endereco': [
      { type: 'required', message: 'O Endereço é obrigatório!' }
    ]
  };

  constructor(private cadastraService: CadastraService,
    private camera: Camera,
    private clientService: ClientService,
    private loginService: LoginService,
    private route: Router,
    private principalService: Principal,
  ) { }

  ngOnInit() {
    this.cadastroAtual = this.cadastraService.getCadastro()
    this.selectedAvatar = ''
    this.userForm = new FormGroup({
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.minLength(14), Validators.required]),
      endereco: new FormControl('', Validators.required),
      whatsapp: new FormControl('', [Validators.minLength(13), Validators.required]),
    });
  }

  cadastraUsuario(): void {

    console.log(this.cadastroAtual)
    console.log(this.userForm.value)
    this.cadastraService.newAccount(this.cadastroAtual).subscribe((data) => {
      console.log(data, 'Account criada')
      const { password, ...resto } = this.cadastroAtual

      this.loginService.login({ username: resto.login, password, rememberMe: true })
        .then(token => {
          console.log("Criou a conta logou e pegou o token", token)
          this.principalService.identity().then(data => console.log(data))
          /*
          this.clientService.createUser({...this.userForm.value, userId:})
            .subscribe(data => {
              console.log(data)
 
            },
              err => {
                console.log("Erro criando pessoa", err)
              })
              */
        })



    }, err => {
      console.log(err)
    })
  }

  async changePatientImage(): Promise<void> {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        console.log(imageData);
        this.selectedAvatar = imageData
      },
      (err) => {
        // Handle error
        console.log(err);
      }
    );
  }


}
