import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { ClientItemModel } from "src/app/pages/client-page/client.item.model";
import { ClientService } from "src/app/providers/client.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";


@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
})
export class DetailModalComponent implements OnInit {
  @Input() user: ClientItemModel;
  @Input() isPatient: boolean;
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
  ) { }

  ngOnInit() {
    console.log(this.isPatient)
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
      cro: new FormControl(cro),
      dataDeNascimento: new FormControl(dataDeNascimento),
      email: new FormControl(email, Validators.email),
      endereco: new FormControl(endereco),
      indicacao: new FormControl(indicacao),
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
      nome: new FormControl(nome),
      cpf: new FormControl(cpf, !this.isPatient ? Validators.minLength(14) : Validators.nullValidator)
    });

  }

  updateUser(): void {
    const { userId, id } = this.user
    // pegando todos os valores do form e adicionando o id do paciente
    this.clientService.updateUser({ ...this.updateUserForm.value, id, userId }).subscribe(data => {
      console.log(data)
      // mandando o paciente atualizado para seu componente pai
      this.modalController.dismiss(data);
    }, err => {
      console.log(err)
    })
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
    this.modalController.dismiss(this.user);
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
