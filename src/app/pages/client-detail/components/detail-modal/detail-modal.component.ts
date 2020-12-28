import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import * as dayjs from "dayjs";
import { ClientItemModel } from "src/app/pages/client-page/client.item.model";
import { ClientService } from "src/app/pages/client-page/client.service";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
})
export class DetailModalComponent implements OnInit {
  @Input() user: ClientItemModel;

  updateUserForm: FormGroup;
  selectedAvatar: string;

  constructor(
    private modalController: ModalController,
    private clientService: ClientService,
    private alertController: AlertController,
    private router: Router
  ) {}

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
      cep: new FormControl(cep),
      cidade: new FormControl(cidade),
      cpf: new FormControl(cpf),
      cro: new FormControl(cro),
      nascimento: new FormControl(dataDeNascimento),
      email: new FormControl(email),
      endereco: new FormControl(endereco),
      indicacao: new FormControl(indicacao),
      nome: new FormControl(nome),
      nomeMae: new FormControl(nomeMae),
      nomePai: new FormControl(nomePai),
      numero: new FormControl(numero),
      observacao: new FormControl(observacao),
      perfil: new FormControl(perfil),
      profissao: new FormControl(profissao),
      rg: new FormControl(rg),
      sexo: new FormControl(sexo),
      telefone: new FormControl(telefone),
      uf: new FormControl(uf),
      whatsapp: new FormControl(whatsapp),
    });
  }

  updateUser() {
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
    } = this.updateUserForm.value
    this.user.foto = this.selectedAvatar;
    this.user.bairro = bairro
    this.user.captacao = captacao
    this.user.celular = celular
    this.user.cep = cep;
    this.user.cidade = cidade
    this.user.cpf = cpf;
    this.user.cro = cro;
    this.user.dataDeNascimento = dataDeNascimento
    this.user.email = email
    this.user.endereco = endereco
    this.user.indicacao = indicacao
    this.user.nome = nome
    this.user.nomeMae = nomeMae
    this.user.nomePai = nomePai
    this.user.numero = numero
    this.user.observacao = observacao
    this.user.profissao = profissao
    this.user.rg = rg;
    this.user.sexo = sexo;
    this.user.telefone = telefone;
    this.user.uf = uf;
    this.user.whatsapp = whatsapp

    this.clientService.updateUser(this.user);
    this.modalController.dismiss();
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: "Confirm",
      message: "Você quer deletar " + this.user.nome + "?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          handler: () => {},
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

  dismissModal() {
    this.modalController.dismiss();
  }
}
