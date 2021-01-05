import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { ClientItemModel } from "src/app/pages/client-page/client.item.model";
import { ClientService } from "src/app/providers/client.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
})
export class DetailModalComponent implements OnInit {
  @Input() user: ClientItemModel;

  updateUserForm: FormGroup;
  selectedAvatar: string;
  meses = "JAN,FEV,MAR,ABR,MAI,JUN,JUL,AGO,SET,OUT,NOV,DEZ";
  generos = ["Masculino", "Feminino", "Outros"]
  captacaoOpcoes = ["FACEBOOK", "INSTAGRAM", "REVISTA", "INDICAÇÃO"]

  validations = {
    'cpf': [
      { type: 'minlength', message: 'Cpf deve ter no mínimo 11 caracteres!' },
    ],
    'cep': [
      { type: 'minlength', message: 'Cep deve ter no mínimo 8 caracteres' },
    ],
    'email': [
      { type: 'pattern', message: 'Entre um e-mail válido.' }
    ],
    'whatsapp': [
      { type: 'minlength', message: 'Whatsapp tem no mínimo 11 dígitos!.' }
    ],
  };



  constructor(
    private modalController: ModalController,
    private clientService: ClientService,
    private alertController: AlertController,
    private router: Router,
    private camera: Camera,
    private file: File
  ) { }

  ngOnInit() {
    this.selectedAvatar = this.user.foto;
    const {
      bairro,
      captacao,
      celular,
      cep,
      cidade,
      cpf,
      cro,
      dataDeNascimento,
      email,
      endereco,
      indicacao,
      nome,
      nomeMae,
      nomePai,
      numero,
      observacao,
      perfil,
      profissao,
      rg,
      sexo,
      telefone,
      uf,
      whatsapp,
    } = this.user;
    console.log(this.user);
    this.updateUserForm = new FormGroup({
      bairro: new FormControl(bairro),
      captacao: new FormControl(captacao),
      celular: new FormControl(celular),
      cep: new FormControl(cep, Validators.minLength(9)),
      cidade: new FormControl(cidade),
      cpf: new FormControl(cpf, Validators.minLength(14)),
      cro: new FormControl(cro),
      dataDeNascimento: new FormControl(dataDeNascimento),
      email: new FormControl(email, Validators.email),
      endereco: new FormControl(endereco),
      indicacao: new FormControl(indicacao),
      nome: new FormControl(nome),
      nomeMae: new FormControl(nomeMae),
      nomePai: new FormControl(nomePai),
      numero: new FormControl(numero),
      observacao: new FormControl(observacao),
      perfil: new FormControl(perfil),
      profissao: new FormControl(profissao),
      rg: new FormControl(rg, Validators.minLength(11)),
      sexo: new FormControl(sexo),
      telefone: new FormControl(telefone),
      uf: new FormControl(uf),
      whatsapp: new FormControl(whatsapp, Validators.minLength(13)),
    });
  }

  updateUser(): void {
    const {
      bairro,
      captacao,
      celular,
      cep,
      cidade,
      cpf,
      cro,
      dataDeNascimento,
      email,
      endereco,
      indicacao,
      nome,
      nomeMae,
      nomePai,
      numero,
      observacao,
      perfil,
      profissao,
      rg,
      sexo,
      telefone,
      uf,
      whatsapp,
    } = this.updateUserForm.value;
    this.user.foto = this.selectedAvatar;
    this.user.bairro = bairro;
    this.user.captacao = captacao;
    this.user.celular = celular;
    this.user.cep = cep;
    this.user.cidade = cidade;
    this.user.cpf = cpf;
    this.user.cro = cro;
    this.user.dataDeNascimento = dataDeNascimento;
    this.user.email = email;
    this.user.endereco = endereco;
    this.user.indicacao = indicacao;
    this.user.nome = nome;
    this.user.nomeMae = nomeMae;
    this.user.nomePai = nomePai;
    this.user.numero = numero;
    this.user.observacao = observacao;
    this.user.profissao = profissao;
    this.user.rg = rg;
    this.user.sexo = sexo;
    this.user.telefone = telefone;
    this.user.uf = uf;
    this.user.whatsapp = whatsapp;

    this.clientService.updateUser(this.user);
    this.modalController.dismiss();
  }

  async deleteUser(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Confirmar",
      message: "Você quer deletar " + this.user.nome + "?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          handler: () => { },
        },
        {
          text: "Sim",
          handler: () => {
            this.clientService.deleteUser(this.user.id);

            this.dismissModal();
            this.router.navigate(["client"]);
          },
        },
      ],
    });
    await alert.present();
  }

  dismissModal(): void {
    this.modalController.dismiss();
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
